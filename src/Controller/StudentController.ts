import { Request, Response } from "express";
import { StudentService } from "../Service/StudentService";

export class StudentController {

    constructor(
        private service: StudentService
    ) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const students = await this.service.getAll();

            res.status(200).json(students);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur lors de la récupération des étudiants"
            });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const student = await this.service.getById(id);

            if (!student) {
                return res.status(404).json({
                    message: "Étudiant introuvable"
                });
            }

            res.status(200).json(student);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const student = await this.service.create(req.body);

            res.status(201).json(student);

        } catch (error: any) {
            console.error(error);

            if (error.code === "23505") {
                return res.status(409).json({
                    message: "Cet email existe déjà"
                });
            }

            res.status(400).json({
                message: error.message
            });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const student = await this.service.update(
                id,
                req.body
            );

            if (!student) {
                return res.status(404).json({
                    message: "Étudiant introuvable"
                });
            }

            res.status(200).json(student);

        } catch (error: any) {
            console.error(error);

            if (error.code === "23505") {
                return res.status(409).json({
                    message: "Cet email existe déjà"
                });
            }

            res.status(400).json({
                message: error.message
            });
        }
    };

    patch = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const student = await this.service.patch(
                id,
                req.body
            );

            if (!student) {
                return res.status(404).json({
                    message: "Étudiant introuvable"
                });
            }

            res.status(200).json(student);

        } catch (error) {
            console.error(error);

            res.status(400).json({
                message: "Erreur lors de la modification"
            });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const deleted = await this.service.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    message: "Étudiant introuvable"
                });
            }

            res.status(204).send();

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur lors de la suppression"
            });
        }
    };
}