const City = require('../model/City.js');
const Predicted_Weather = require('../model/Predicted_Weather.js');
const Weathers = require('../model/Weathers.js');
const sequelize = require("../config/dbConnect.js");
const puppeteer = require('puppeteer');
const axios = require('axios');
const { Op } = require("sequelize");


exports.getIndex = async (req, res) => {
    const cities = await allCities();
    res.json(cities);
};


exports.getCity = async (req, res) => {
    const control = await controlCity(req.params.city);
    res.json(control);
    
}

const allCities = async ()=>{
    const cities = await City.findAll({order: [["ID","ASC"]]});
    return cities;
};

const controlCity = async (cityStub) => {
    try {
        const city = await City.findAll({ where: { SEHIRSTUB: cityStub } });
        if (city.length === 0) {  // when it comes here it works
            return { value: "Bu şehir veritabanımızda bulunmamaktadır.", city: { SEHIRSTUB: "" } };
        }
        return controlPredictedWeather(city[0]);
    } catch (err) {
        console.log(err);
    }
};

const controlPredictedWeather = async (city) => {
    try {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const dayMonth = month + "-" + day;
        const degree = await Predicted_Weather.findAll({ 
            where:{
                CITYID: city.ID,
                    DATE: {
                        [Op.like]:`%${dayMonth}`
                    }
            }
        });
        if (degree.length === 0) {
            return (getPredictedWeather(city));
        }
        return { value: Math.ceil(5/9*(degree[0].DEGREE-32)), city: city };
    } catch (err) {
        console.log(err)
    }
};

const getPredictedWeather = async city => {

    try {
        let tdValue = [];
        for (let i = 6; i > 0; i--) {

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear() - i;
            const fullDate = year + '-' + month + '-' + day
            console.log(fullDate);
            const url = `https://www.wunderground.com/history/daily/${city.WUCODE}/date/${fullDate}`;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
            await page.waitForSelector("#inner-content > div.region-content-main > div.row > div:nth-child(3) > div:nth-child(1) > div > lib-city-history-summary > div > div.summary-table > table > tbody:nth-child(2)");
            let value = await page.evaluate(() => {
                let degree = document.querySelector("#inner-content > div.region-content-main > div.row > div:nth-child(3) > div:nth-child(1) > div > lib-city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").innerHTML;
                return degree;
            });
            await page.close();
            console.log(value);
            tdValue.push({ value: value, date: fullDate })
            await browser.close();

        }
        console.log(tdValue);
        return insertDataToDB(tdValue, city);
    }
    catch (err) {
        console.log(err);
        return { value: "", city: {
            SEHIRTUB: city.SEHIRSTUB,
            SEHIRADI: "Bu şehirin verilerine ulaşamıyoruz."
        } };
    }
}

const insertDataToDB = async (value, city) => {
    try {
        for(const item of value) {
            await Weathers.create({
                CITYID: city.ID,
                DEGREE: item.value,
                DATE: item.date,
            })}

        return predictWeather(city);
    }
    catch (err) {
        console.log(err);
    }

}

const predictWeather = async (city) => {

    try {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const dayMonth = month + "-" + day;
        const value = await sequelize.query(`SELECT AVG("DEGREE") FROM "WEATHERS" WHERE "CITYID" = ${city.ID} AND "DATE" LIKE '%${dayMonth}'`)
        const avg = Math.round(value[0][0].avg);
        let year = date.getFullYear();
        const fullYear = year + "-" + month + "-" + day;
        console.log(fullYear);
        await Predicted_Weather.create({
            CITYID: city.ID,
            DEGREE: avg,
            DATE: fullYear,
        })
        return controlPredictedWeather(city);

    }
    catch (err) {
        console.log(err);
    }
}
