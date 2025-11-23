import { DataTypes } from "sequelize"
import sequelize from "../db/Db.js"

const KYC_Model = sequelize.define("kyc_model", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    document_type: {
        type: DataTypes.ENUM(["aadhar", "pan", "passport"]),
        allowNull: false,
        defaultValue: "aadhar"
    },
    doucment_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    front_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    back_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    selfie_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(["pending", "approved", "rejected"]),
        allowNull: false,
        defaultValue: "pending"
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
    {
        tableName: "user_kyc",
        timestamps: true,
    }
)

export default KYC_Model;