'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kacamatan extends Model {
    static associate(models) {
      this.hasMany(models.Data_Jenazah, {
        foreignKey: 'kacamatan_id'
      })
    }
  }
  Kacamatan.init({
    nama: DataTypes.STRING
  }
  , {
    timestamps: false,
    sequelize,
    modelName: 'Kacamatan',
  });
  return Kacamatan;
};