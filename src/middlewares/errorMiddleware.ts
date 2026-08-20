const { AppError } = require("./appError");

const asyncHandler = (handler: any) => (request: any, response: any, next: any) => {
    Promise.resolve(handler(request, response, next)).catch(next);
};

const notFoundHandler = (request: any, response: any, next: any) => {
    void response;

    next(new AppError(`Route introuvable : ${request.method} ${request.originalUrl}`, 404));
};

const errorHandler = (error: any, request: any, response: any, next: any) => {
    void request;
    void next;

    const statusCode = error.statusCode ?? (error.code === "23505" ? 409 : 500);

    if (statusCode >= 500) {
        console.error(error);
    }

    response.status(statusCode).json({
        error: {
            message: statusCode >= 500 ? "Une erreur interne est survenue." : error.message,
            statusCode
        }
    });
};

module.exports = { asyncHandler, notFoundHandler, errorHandler };

export {};
