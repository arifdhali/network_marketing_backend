import sequelize from "../db/Db.js";
import { DataTypes } from "sequelize";

const Plans = sequelize.define('plans', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plan_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),

        allowNull: false
    },
    direct_commission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    level_commissions: {
        type: DataTypes.JSON,
        allowNull: true
    },

}, {
    tableName: 'plans',
    timestamps: true
});

export default Plans;