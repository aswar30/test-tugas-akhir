'use strict';

/** @type {import('sequelize-cli').Migration} */
const date = new Date()
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Total_lahan_makams', [
      {
        total: 500,
        terisi: 0,
        createdAt: date,
        updatedAt:date,
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Total_lahan_makams')
  }
};
