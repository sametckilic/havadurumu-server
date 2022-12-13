const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect.js");

const City = sequelize.define("CITY", {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  
  SEHIRADI: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  SEHIRSTUB: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  WUCODE: {
    type: DataTypes.CHAR,
    allowNull: false,
  }
  
},{
  tableName: 'CITIES'
});

module.exports = City;