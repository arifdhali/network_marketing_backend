"use strict";
import crypto from "crypto";

export async function up(queryInterface, Sequelize) {

  return queryInterface.bulkInsert("users", [
    {
      username: "admin01",
      password: crypto.createHash("sha256").update("admin123").digest("hex"),
      name: "Admin User",
      email: "admin@example.com",
      mobile: "9999999999",
      sponsor_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: "john01",
      password: crypto.createHash("sha256").update("john123").digest("hex"),
      name: "John Doe",
      email: "john@example.com",
      mobile: "8888888888",
      sponsor_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("users", null, {});
}
