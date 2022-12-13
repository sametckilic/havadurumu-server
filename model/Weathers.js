const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect.js");

const Weathers = sequelize.define("WEATHERS",{

    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    CITYID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DEGREE: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CONDITION:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    DATE:{
        type: DataTypes.STRING,
        allowNull: false,
    }

},{
    tableName: "WEATHERS"
});


module.exports = Weathers;
