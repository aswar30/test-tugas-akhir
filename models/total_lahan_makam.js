'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Total_lahan_makam extends Model {
    
  }
  Total_lahan_makam.init({
    total: DataTypes.INTEGER,
    terisi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Total_lahan_makam',
  });
  return Total_lahan_makam;
};