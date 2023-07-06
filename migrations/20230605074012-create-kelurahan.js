'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kelurahans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kacamatan_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Kacamatans',
            key: 'id'
          },
      },
      nama: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Kelurahans');
  }
};