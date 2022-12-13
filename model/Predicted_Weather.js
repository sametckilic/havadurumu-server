const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect.js");

const Predicted_Weather = sequelize.define("PREDICTED_WEATHER", {
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
    type: DataTypes.REAL,
    allowNull: false,
  },
  CONDITION:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  DATE: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
},{
  tableName: 'PREDICTED_WEATHER'
});

module.exports = Predicted_Weather;