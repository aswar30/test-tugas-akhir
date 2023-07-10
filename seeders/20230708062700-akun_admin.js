'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')
const date = new Date()
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Pengelola_Makams', [
      {
        nama: 'admin 1',
        email: 'admin1@gmail.com',
        kata_sandi: await bcrypt.hash('123admin', 10),
        createdAt: date,
        updatedAt:date
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Pengelola_Makams', null, {})
  }
};
