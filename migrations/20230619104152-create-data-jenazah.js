'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Jenazahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      masyarakat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Masyarakats',
          key: 'id'
        },
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NIK: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tutup_usia: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      kartu_Kelaurga: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      KTP: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kartu_kuning: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surat_keterangan_RTRW:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      KTP_ahli_waris: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surat_keterangan_meninggal_RS:{
        type: Sequelize.STRING,
      },
      tanggal_meninggal: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tanggal_dikebumikan: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Data_Jenazahs')
  }
}