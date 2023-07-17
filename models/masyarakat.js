'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Masyarakat extends Model {
    static associate(models) {
      this.hasMany(models.Data_Jenazah, {
        foreignKey: 'masyarakat_id',
      })
    }
  }
  Masyarakat.init({
    nama: {
        type: DataTypes.STRING,
        allowNull:false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Email cannot be ommited'
          },
          notEmpty: {
            msg: 'Email cannot be an empty string'
          },
          isEmail: {
            msg : 'Wrong email format'
          },
       },
    },
    nomor_KTP: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [16,16]
        }
      },
    tempat_lahir: {
        type: DataTypes.STRING,
      },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
      },
    pekerjaan: {
        type: DataTypes.STRING,
      },
    alamat: {
        type: DataTypes.STRING,
      },
    no_HP: {
        type: DataTypes.STRING,
      },
    jenis_kelamin: {
        type: DataTypes.STRING,
      },
    kata_sandi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull : {
            msg : 'Kata Sandi Tidak Boleh Kosong'
          },
        },
      },
  }, {
    sequelize,
    modelName: 'Masyarakat',
  });
  return Masyarakat;
};