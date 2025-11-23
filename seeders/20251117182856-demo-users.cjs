"use strict";

const crypto = require("crypto");
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    const HASH_ALGO = (process.env.CRYPTO_HASH_ALGO).toString();
    return queryInterface.bulkInsert("users", [
      {
        username: "admin01",
        password: crypto.createHash(HASH_ALGO).update("admin123").digest("hex"),
        name: "Admin User",
        email: "admin@example.com",
        mobile: "9999999999",
        refer_id:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "john01",
        password: crypto.createHash(HASH_ALGO).update("john123").digest("hex"),
        name: "John Doe",
        email: "john@example.com",
        mobile: "8888888888",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
