const jwt = require("jsonwebtoken") as typeof import("jsonwebtoken");

const { env } = require("../config/env");

const { AppError } = require("./appError");

const generateToken = (payload: object) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as import("jsonwebtoken").SignOptions);

const verifyToken = (request: any, response: any, next: any) => {
    void response;

    const authorization = request.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        next(new AppError("Jeton d'authentification manquant.", 401));

        return;
    }

    try {
        jwt.verify(authorization.slice(7), env.jwtSecret);

        next();
    } catch {
        next(new AppError("Jeton d'authentification invalide ou expiré.", 401));
    }
};

module.exports = { generateToken, verifyToken };

export {};
