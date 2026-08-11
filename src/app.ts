import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/StudentRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API étudiants fonctionnelle"
    });
});

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});