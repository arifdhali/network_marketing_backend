import express from "express";
const app = express();
import cors from "cors";
import sequelize from "./db/Db.js";
import router_user from "./routes/User.route.js"
import router_wallet from "./routes/Wallet.route.js";
import router_admin from "./routes/Admin.route.js";
import "./models/Admin.js";
import "./models/Plans.js";
import "./models/associations.js";

const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*"
}))

// await sequelize.sync({ alter: false,force:false });


app.use("/api/v1/user", router_user);
app.use("/api/v1/wallet", router_wallet);
app.use("/api/v1/admin", router_admin);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });

})

app.listen(PORT, () => {
    console.log(`server runnin on http://localhost:${PORT}`)
})


app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});