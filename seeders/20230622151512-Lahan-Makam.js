'use strict';

/** @type {import('sequelize-cli').Migration} */
const date = new Date()
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Lahan_Makams', [
      {
        blok_id: 1,
        Nomor: 3,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 5,
        Nomor: 123,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 3,
        Nomor: 123,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 2,
        Nomor: 10,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 1,
        Nomor: 2,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 2,
        Nomor: 123,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
      {
        blok_id: 3,
        Nomor: 123,
        status: 'kosong',
        harga: 350000,
        panjang: 2,
        lebar: 1,
        createdAt : date,
        updatedAt : date
      },
    ])
  },

  async down (queryInterface) {
     await queryInterface.bulkDelete('Lahan_Makams', null, {});
  }
};
