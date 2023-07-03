'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lahan_Makams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blok_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bloks',
          key: 'id',
        },
      },
      Nomor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        //defaultValue: 'kosong',
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gambar: {
          type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Lahan_Makams')
  }
}