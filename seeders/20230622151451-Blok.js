'use strict';

/** @type {import('sequelize-cli').Migration} */
const date = new Date()
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Bloks', [
      {
        kode: 'A',
        createdAt : date,
        updatedAt : date
      },
      {
        kode: 'B',
        createdAt : date,
        updatedAt : date
      },
      {
        kode: 'C',
        createdAt : date,
        updatedAt : date
      },
      {
        kode: 'D',
        createdAt : date,
        updatedAt : date
      },
      {
        kode: 'E',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'F',
        createdAt : date,
        updatedAt : date
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Bloks', null, {})
  }
};
