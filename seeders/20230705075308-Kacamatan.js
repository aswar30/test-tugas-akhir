'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Kacamatans', [
      {
        nama: 'Biringkanaya'
      },
      {
        nama: 'Bontoala'
      },
      {
        nama: 'Kepulauang Sangkarrang'
      },
      {
        nama: 'Makassar'
      },
      {
        nama: 'Mamajang'
      },
      {
        nama: 'Manggala'
      },
      {
        nama: 'Mariso'
      },
      {
        nama: 'Panakkukang'
      },
      {
        nama: 'Rappocini'
      },
      {
        nama: 'Tallo'
      },
      {
        nama: 'Tamalanrea'
      },
      {
        nama: 'Tamalate'
      },
      {
        nama: 'Ujung Pandang'
      },
      {
        nama: 'Ujung Tanah'
      },
      {
        nama: 'Wajo'
      },
    ])
  },

  async down (queryInterface) {
     await queryInterface.bulkDelete('Kacamatans', null, {});
    
  }
};
