'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Jenazah extends Model {
    static associate(models) {
      this.belongsTo(models.Masyarakat, {
        foreignKey: 'masyarakat_id',
      })
    }
  }
  Data_Jenazah.init({
    masyarakat_id: {
      type: DataTypes.INTEGER,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIK: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tutup_usia: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      kartu_Kelaurga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KTP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kartu_kuning: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surat_keterangan_RTRW:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      KTP_ahli_waris: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surat_keterangan_meninggal_RS:{
        type: DataTypes.STRING,
      },
      tanggal_meninggal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tanggal_dikebumikan: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Data_Jenazah',
  });
  return Data_Jenazah;
};