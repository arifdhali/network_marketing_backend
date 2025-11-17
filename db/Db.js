import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,

    define: {
        engine: "InnoDB",
        timestamps: true,
        underscored: true,
        freezeTableName: true
    }

});

await sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Unable to connect to the database:", err);
    });

await sequelize.sync({ alter: true, force: false })

export default sequelize;