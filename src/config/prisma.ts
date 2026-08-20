const { PrismaClient } = require("@prisma/client") as typeof import("@prisma/client");

const prisma = new PrismaClient();

module.exports = { prisma };

export {};
