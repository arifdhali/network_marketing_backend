'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user_kyc', [
      {
        user_id: 1,
        document_type: 'aadhar',
        doucment_number: '1234-5678-9012',
        front_image_url: 'http://example.com/front.jpg',
        back_image_url: 'http://example.com/back.jpg',
        selfie_image_url: 'http://example.com/selfie.jpg',
        status: 'rejected',
        reason: 'Blurry images',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        document_type: 'pan',
        doucment_number: 'ABCDE1234F',
        front_image_url: 'http://example.com/front.jpg',
        back_image_url: 'http://example.com/back.jpg',
        selfie_image_url: 'http://example.com/selfie.jpg',
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        document_type: 'passport',
        doucment_number: 'M1234567',
        front_image_url: 'http://example.com/front.jpg',
        back_image_url: 'http://example.com/back.jpg',
        selfie_image_url: 'http://example.com/selfie.jpg',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      },


    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
