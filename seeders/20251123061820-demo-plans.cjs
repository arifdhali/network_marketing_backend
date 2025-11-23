'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert("plans", [
      {
        plan_name: "Basic Plan",
        price: 49.99,
        direct_commission: 5.0,
        level_commissions: JSON.stringify([2, 1, 0.5]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_name: "Standard Plan",
        price: 99.99,
        direct_commission: 10.0,
        level_commissions: JSON.stringify([3, 2, 1]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_name: "Premium Plan",
        price: 199.99,
        direct_commission: 15.0,
        level_commissions: JSON.stringify([5, 3, 2]),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("plans", null, {});
  }
};
