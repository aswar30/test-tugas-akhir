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
      },{
        kode: 'G',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'H',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'I',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'J',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'K',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'L',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'M',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'F',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'N',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'O',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'P',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'Q',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'R',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'S',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'T',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'U',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'v',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'W',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'X',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'Y',
        createdAt : date,
        updatedAt : date
      },{
        kode: 'X',
        createdAt : date,
        updatedAt : date
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Bloks', null, {})
  }
};
