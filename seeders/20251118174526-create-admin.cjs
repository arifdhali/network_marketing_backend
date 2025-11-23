"use strict";

const crypto = require("crypto"); 

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = crypto
      .createHash("sha256")
      .update("Admin1!")
      .digest("hex");

    return queryInterface.bulkInsert(
      "admin",
      [
        {
          email: "admin@yopmail.com",
          password: passwordHash,
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
      
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("admin", { username: "admin" }, {});
  },
};
