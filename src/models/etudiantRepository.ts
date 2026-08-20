import type { Etudiant } from "../types/etudiant";

const { prisma } = require("../config/prisma") as { prisma: import("@prisma/client").PrismaClient };

class EtudiantRepository {
    async findAll(): Promise<Etudiant[]> {
        return prisma.etudiant.findMany({ orderBy: { id: "asc" } });
    }

    async findById(id: number): Promise<Etudiant | null> {
        return prisma.etudiant.findUnique({ where: { id } });
    }

    async create(etudiant: Omit<Etudiant, "id" | "createdAt" | "updatedAt">): Promise<Etudiant> {
        return prisma.etudiant.create({ data: etudiant });
    }

    async replace(id: number, etudiant: Omit<Etudiant, "id" | "createdAt" | "updatedAt">): Promise<Etudiant | null> {
        return this.update(id, etudiant);
    }

    async updatePartial(id: number, etudiant: Partial<Omit<Etudiant, "id" | "createdAt" | "updatedAt">>): Promise<Etudiant | null> {
        return this.update(id, etudiant);
    }

    async remove(id: number): Promise<boolean> {
        try {
            await prisma.etudiant.delete({ where: { id } });

            return true;
        } catch (error: any) {
            if (error.code === "P2025") {
                return false;
            }

            throw error;
        }
    }

    private async update(id: number, etudiant: object): Promise<Etudiant | null> {
        try {
            return await prisma.etudiant.update({ where: { id }, data: etudiant });
        } catch (error: any) {
            if (error.code === "P2025") {
                return null;
            }

            throw error;
        }
    }
}

module.exports = { EtudiantRepository };
