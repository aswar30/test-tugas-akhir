'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lahan_Makam extends Model {
    static associate(models) {
      this.belongsTo(models.Blok, {
        foreignKey: 'blok_id',
      })
    }
  }
  Lahan_Makam.init({
    blok_id: {
      type: DataTypes.INTEGER,
    },
    Nomor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'kosong',
      },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lebar: {
        type: DataTypes.INTEGER,
      },
      panjang: {
        type: DataTypes.INTEGER,
      },
    gambar: {
        type: DataTypes.STRING,
      },
  }, {
    sequelize,
    modelName: 'Lahan_Makam',
  });
  return Lahan_Makam;
};