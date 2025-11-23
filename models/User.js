import { DataTypes } from "sequelize";
import sequelize from "../db/Db.js";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const User = sequelize.define('users_model', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.VIRTUAL,

        set(value) {
            this.setDataValue('password_hash', value);
            const hashedPassword = crypto.createHash(`${process.env.CRYPTO_HASH_ALGO}`).update(value).digest('hex');
            this.setDataValue('password', hashedPassword);
        }
    },
    password: {
        type: DataTypes.STRING(255)
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    refer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    position: {
        type: DataTypes.STRING(40),
        defaultValue: 'left',
        allowNull: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    kyc_status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: "pending"
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: "active"
    }
}, {
    tableName: 'users',
    timestamps: true
})





export default User;