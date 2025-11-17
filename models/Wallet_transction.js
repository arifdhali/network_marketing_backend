import sequelize from "../db/Db.js";
import { DataTypes } from "sequelize";
import User from "../models/User.js";


const Wallet_transaction = sequelize.define('wallet_transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    transction_type: {
        type: DataTypes.ENUM('credit', 'debit'),
        defaultValue: 'credit',
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {
    tableName: 'wallet_transaction',
    timestamps: true
});




export default Wallet_transaction;