import { Router } from "express";
import { StudentRepository } from "../Repositories/StudentsRepository";
import { StudentService } from "../Service/StudentService";
import { StudentController } from "../Controller/StudentController";

const router = Router();

const repository = new StudentRepository();
const service = new StudentService(repository);
const controller = new StudentController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.delete);

export default router;