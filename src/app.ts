const express = require("express") as typeof import("express");

const cors = require("cors") as typeof import("cors");

const { env } = require("./config/env");

const { etudiantRouter } = require("./routes/etudiantRoutes");

const { generateToken } = require("./middlewares/authMiddleware");

const { errorHandler, notFoundHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors({ origin: env.corsOrigins.length > 0 ? env.corsOrigins : true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));

app.use(express.json());

app.get("/", (request, response) => {
    void request;

    response.status(200).json({ message: "API étudiants opérationnelle." });
});

app.post("/login", (request, response) => {
    const userId = request.body?.userId ?? "postman-test-user";

    if (typeof userId !== "string" && typeof userId !== "number") {
        response.status(400).json({
            error: {
                message: "userId doit être une chaîne ou un nombre.",
                statusCode: 400
            }
        });

        return;
    }

    const token = generateToken({ userId });

    response.status(200).json({
        token,
        tokenType: "Bearer"
    });
});

app.use("/etudiants", etudiantRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(env.port, () => console.log(`Serveur démarré sur http://localhost:${env.port}`));

module.exports = { app };

export {};
