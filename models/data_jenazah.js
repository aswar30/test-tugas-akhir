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
      this.belongsTo(models.Kacamatan, {
        foreignKey: 'kacamatan_id',
      })
      this.belongsTo(models.Kelurahan, {
        foreignKey: 'kelurahan_id',
      })
    }
  }
  Data_Jenazah.init({
    masyarakat_id: {
      type: DataTypes.INTEGER,
    },
    kacamatan_id: {
      type: DataTypes.INTEGER,
    },
    kelurahan_id: {
      type: DataTypes.INTEGER,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIK: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [16,16]
        }
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
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
      },
  }, {
    sequelize,
    modelName: 'Data_Jenazah',
  });
  return Data_Jenazah;
};