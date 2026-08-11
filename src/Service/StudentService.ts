import { StudentRepository } from "../Repositories/StudentsRepository";
import { Student } from "../Model/Students";

export class StudentService {

    constructor(
        private repository: StudentRepository
    ) {}

    async getAll(): Promise<Student[]> {
        return this.repository.findAll();
    }

    async getById(id: number): Promise<Student | null> {
        return this.repository.findById(id);
    }

    async create(
        student: Omit<Student, "id" | "created_at">
    ): Promise<Student> {

        if (!student.first_name || !student.last_name) {
            throw new Error("Le prénom et le nom sont obligatoires");
        }

        if (!student.email) {
            throw new Error("L'email est obligatoire");
        }

        return this.repository.create(student);
    }

    async update(
        id: number,
        student: Omit<Student, "id" | "created_at">
    ): Promise<Student | null> {

        return this.repository.update(id, student);
    }

    async patch(
        id: number,
        student: Partial<Omit<Student, "id" | "created_at">>
    ): Promise<Student | null> {

        return this.repository.patch(id, student);
    }

    async delete(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}