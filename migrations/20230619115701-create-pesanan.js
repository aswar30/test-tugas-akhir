'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pesanans', {
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
      masyarakat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Masyarakats',
          key: 'id',
        },
      },
      lahan_makam_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lahan_Makams',
          key: 'id',
        },
      },
      data_jenazah_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Data_Jenazahs',
          key: 'id',
        },
      },
      jumlah_pembayaran: {
        type: Sequelize.INTEGER,
      },
      Pembayaran: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
      },
      url_midtrans: {
        type: Sequelize.STRING,
      },
      token_midtrans: {
        type: Sequelize.STRING,
      },
      order_id_midtrans : {
        type: Sequelize.STRING,
      },
      nomor_pesanan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Tanggal: {
        type: Sequelize.DATE,
        //defaultValue
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Pesanans');
  }
};