'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengelola_Makam extends Model {
  }
  Pengelola_Makam.init({
    nama: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      kata_sandi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Pengelola_Makam',
  });
  return Pengelola_Makam;
};