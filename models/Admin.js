import { DataTypes } from "sequelize";
import sequelize from "../db/Db.js";


const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('superadmin', 'admin', 'moderator'),
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    tableName: 'admin',
    timestamps: true,
    underscored: true
})

export default Admin;