'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
     await queryInterface.bulkInsert('Kelurahans', [
      {
        kacamatan_id: 1,
        nama: 'Bakung'
      },
      {
        kacamatan_id: 1,
        nama: 'Berua'
      },
      {
        kacamatan_id: 1,
        nama: 'Bulurokeng'
      },
      {
        kacamatan_id: 1,
        nama: 'Daya'
      },
      {
        kacamatan_id: 1,
        nama: 'Katimbang'
      },
      {
        kacamatan_id: 1,
        nama: 'Laikang'
      },
      {
        kacamatan_id: 1,
        nama: 'Paccerakkang'
      },
      {
        kacamatan_id: 1,
        nama: 'Pai'
      },
      {
        kacamatan_id: 1,
        nama: 'Sudiang'
      },
      {
        kacamatan_id: 1,
        nama: 'Sudiang Raya'
      },
      {
        kacamatan_id: 1,
        nama: 'Unitia'
      },
      {
        kacamatan_id: 2,
        nama: 'Baraya'
      },
      {
        kacamatan_id: 2,
        nama: 'Bontoala'
      },
      {
        kacamatan_id: 2,
        nama: 'Bontoala Parang'
      },
      {
        kacamatan_id: 2,
        nama: 'Bontoala Tua'
      },
      {
        kacamatan_id: 2,
        nama: 'Bunga Ejaya'
      },
      {
        kacamatan_id: 2,
        nama: 'Gaddong'
      },
      {
        kacamatan_id: 2,
        nama: 'Layang'
      },
      {
        kacamatan_id: 2,
        nama: 'Malimongan Baru'
      },
      {
        kacamatan_id: 2,
        nama: 'Parang Layang'
      },
      {
        kacamatan_id: 2,
        nama: 'Timungan Lompoa'
      },
      {
        kacamatan_id: 2,
        nama: 'Tompo Balang'
      },
      {
        kacamatan_id: 2,
        nama: 'Wajo Baru'
      },
      {
        kacamatan_id: 3,
        nama: 'Barrang Caddi'
      },
      {
        kacamatan_id: 3,
        nama: 'Barrang Lompo'
      },
      {
        kacamatan_id: 3,
        nama: 'Kodigareng'
      },
      {
        kacamatan_id: 4,
        nama: 'Bara-Baraya',
      },
      {
        kacamatan_id: 4,
        nama: 'Bara-Baraya Selatan',
      },
      {
        kacamatan_id: 4,
        nama: 'Bara-Baraya Timur',
      },
      {
        kacamatan_id: 4,
        nama: 'Bara-Baraya Utara',
      },
      {
        kacamatan_id: 4,
        nama: 'Barana',
      },
      {
        kacamatan_id: 4,
        nama: 'Maccini',
      },
      {
        kacamatan_id: 4,
        nama: 'Maccini Gusung',
      },
      {
        kacamatan_id: 4,
        nama: 'Maccini Parang',
      },
      {
        kacamatan_id: 4,
        nama: 'Maradekaya',
      },
      {
        kacamatan_id: 4,
        nama: 'Maradekaya Selatan',
      },
      {
        kacamatan_id: 4,
        nama: 'Maradekaya Utara',
      },
      {
        kacamatan_id: 4,
        nama: 'Maricaya',
      },
      {
        kacamatan_id: 4,
        nama: 'Maricaya Baru',
      },
      { 
        kacamatan_id: 4,
        nama: 'Bara-Baraya',
      },
      {
        kacamatan_id: 4,
        nama: 'Bara-Baraya',
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Kelurahans', null, {})
  }
};
