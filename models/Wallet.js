import { DataTypes } from "sequelize";
import sequelize from "../db/Db.js";


const Wallet = sequelize.define("wallet", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false
    }
}, {
    tableName: "wallet",
    timestamps: true
});

export default Wallet;