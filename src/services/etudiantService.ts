import type { Etudiant, EtudiantInput } from "../types/etudiant";

const { AppError } = require("../middlewares/appError");

const allowedKeys = ["nomEtudiant", "prenomEtudiant", "ageEtudiant", "filiereEtudiant"];

class EtudiantService {
    repository: any;

    constructor(repository: any) {
        this.repository = repository;
    }

    async getAll(): Promise<Etudiant[]> {
        return this.repository.findAll();
    }

    async getById(id: number): Promise<Etudiant> {
        const etudiant = await this.repository.findById(id);

        if (!etudiant) {
            throw new AppError("Étudiant introuvable.", 404);
        }

        return etudiant;
    }

    async create(input: EtudiantInput): Promise<Etudiant> {
        return this.repository.create(this.validate(input, false));
    }

    async replace(id: number, input: EtudiantInput): Promise<Etudiant> {
        const etudiant = await this.repository.replace(id, this.validate(input, false));

        if (!etudiant) {
            throw new AppError("Étudiant introuvable.", 404);
        }

        return etudiant;
    }

    async updatePartial(id: number, input: EtudiantInput): Promise<Etudiant> {
        const etudiant = await this.repository.updatePartial(id, this.validate(input, true));

        if (!etudiant) {
            throw new AppError("Étudiant introuvable.", 404);
        }

        return etudiant;
    }

    async remove(id: number): Promise<void> {
        const removed = await this.repository.remove(id);

        if (!removed) {
            throw new AppError("Étudiant introuvable.", 404);
        }
    }

    private validate(input: EtudiantInput, partial: boolean): object {
        if (!input || typeof input !== "object" || Array.isArray(input)) {
            throw new AppError("Le corps de la requête doit être un objet JSON.", 400);
        }

        const keys = Object.keys(input);

        if (keys.some((key) => !allowedKeys.includes(key))) {
            throw new AppError("Le corps contient un champ non autorisé.", 400);
        }

        if (partial && keys.length === 0) {
            throw new AppError("Au moins un champ doit être fourni.", 400);
        }

        if (!partial && keys.length !== allowedKeys.length) {
            throw new AppError("nomEtudiant, prenomEtudiant, ageEtudiant et filiereEtudiant sont obligatoires.", 400);
        }

        const etudiant: Record<string, string | number> = {};

        if (input.nomEtudiant !== undefined) {
            etudiant.nomEtudiant = this.requireText(input.nomEtudiant, "nomEtudiant");
        }

        if (input.prenomEtudiant !== undefined) {
            etudiant.prenomEtudiant = this.requireText(input.prenomEtudiant, "prenomEtudiant");
        }

        if (input.ageEtudiant !== undefined) {
            etudiant.ageEtudiant = this.requireAge(input.ageEtudiant);
        }

        if (input.filiereEtudiant !== undefined) {
            etudiant.filiereEtudiant = this.requireText(input.filiereEtudiant, "filiereEtudiant");
        }

        return etudiant;
    }

    private requireText(value: unknown, fieldName: string): string {
        if (typeof value !== "string" || value.trim().length === 0) {
            throw new AppError(`${fieldName} doit être une chaîne non vide.`, 400);
        }

        return value.trim();
    }

    private requireAge(value: unknown): number {
        if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 150) {
            throw new AppError("ageEtudiant doit être un entier compris entre 0 et 150.", 400);
        }

        return value;
    }
}

module.exports = { EtudiantService };
