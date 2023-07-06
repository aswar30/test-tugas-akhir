'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelurahan extends Model {
    static associate(models) {
      this.hasMany(models.Data_Jenazah, {
        foreignKey: 'kelurahan_id'
      })
    }
  }
  Kelurahan.init({
    kacamatan_id: DataTypes.INTEGER,
    nama: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Kelurahan',
  });
  return Kelurahan;
};