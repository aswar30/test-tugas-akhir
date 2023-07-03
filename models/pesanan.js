'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesanan extends Model {
    static associate(models) {
      this.belongsTo(models.Blok, {
        foreignKey: 'blok_id',
      })
      this.belongsTo(models.Masyarakat, {
        foreignKey: 'masyarakat_id',
      })
      this.belongsTo(models.Data_Jenazah, {
        foreignKey: 'data_jenazah_id',
      })
      this.belongsTo(models.Lahan_Makam, {
        foreignKey: 'lahan_makam_id',
      })
    }
  }
  Pesanan.init({
    blok_id: {
      type: DataTypes.INTEGER,
    },
    masyarakat_id: {
      type: DataTypes.INTEGER,
    },
    lahan_makam_id: {
      type: DataTypes.INTEGER,
    },
    data_jenazah_id: {
      type: DataTypes.INTEGER,
    },
    jumlah_pembayaran: {
        type: DataTypes.INTEGER,
      },
    Pembayaran: {
        type: DataTypes.STRING
      },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Menunggu Pembayaran',
      },
    url_midtrans: {
        type: DataTypes.STRING,
      },
    token_midtrans: {
        type: DataTypes.STRING,
      },
    order_id_midtrans : {
        type: DataTypes.STRING,
      },
    nomor_pesanan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tanggal: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Pesanan',
  });
  return Pesanan;
};