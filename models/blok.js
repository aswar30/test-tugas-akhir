'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blok extends Model {
    static associate(models) {

      this.hasMany(models.Pesanan, {
        foreignKey : 'blok_id'
      })
    }
  }
  Blok.init({
    kode: {
        type: DataTypes.STRING,
      },
  }, {
    sequelize,
    modelName: 'Blok',
  });
  return Blok;
};