const dotenv = require("dotenv") as typeof import("dotenv");

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("La variable d'environnement JWT_SECRET est obligatoire.");
}

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT doit être un entier positif.");
}

const env = {
    port,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
    corsOrigins: process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? []
};

module.exports = { env };

export {};
