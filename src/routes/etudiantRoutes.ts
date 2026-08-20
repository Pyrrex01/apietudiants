const { Router } = require("express");

const { EtudiantRepository } = require("../models/etudiantRepository");

const { EtudiantService } = require("../services/etudiantService");

const { EtudiantController } = require("../controllers/etudiantController");

const { verifyToken } = require("../middlewares/authMiddleware");

const { asyncHandler } = require("../middlewares/errorMiddleware");

const router = Router();

const controller = new EtudiantController(new EtudiantService(new EtudiantRepository()));

router.get("/", asyncHandler(controller.getAll));

router.get("/:id", asyncHandler(controller.getById));

router.post("/", verifyToken, asyncHandler(controller.create));

router.put("/:id", verifyToken, asyncHandler(controller.replace));

router.patch("/:id", verifyToken, asyncHandler(controller.updatePartial));

router.delete("/:id", verifyToken, asyncHandler(controller.remove));

module.exports = { etudiantRouter: router };

export {};
