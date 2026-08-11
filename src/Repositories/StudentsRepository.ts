import { pool } from "../config/database";
import { Student } from "../Model/Students";

export class StudentRepository {

    async findAll(): Promise<Student[]> {
        const result = await pool.query(
            "SELECT * FROM students ORDER BY id"
        );

        return result.rows;
    }

    async findById(id: number): Promise<Student | null> {
        const result = await pool.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        );

        return result.rows[0] ?? null;
    }

    async create(student: Omit<Student, "id" | "created_at">): Promise<Student> {
        const result = await pool.query(
            `INSERT INTO students
            (first_name, last_name, email, age, major, gpa, is_enrolled)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                student.first_name,
                student.last_name,
                student.email,
                student.age,
                student.major,
                student.gpa,
                student.is_enrolled
            ]
        );

        return result.rows[0];
    }

    async update(
        id: number,
        student: Omit<Student, "id" | "created_at">
    ): Promise<Student | null> {

        const result = await pool.query(
            `UPDATE students
             SET first_name = $1,
                 last_name = $2,
                 email = $3,
                 age = $4,
                 major = $5,
                 gpa = $6,
                 is_enrolled = $7
             WHERE id = $8
             RETURNING *`,
            [
                student.first_name,
                student.last_name,
                student.email,
                student.age,
                student.major,
                student.gpa,
                student.is_enrolled,
                id
            ]
        );

        return result.rows[0] ?? null;
    }

    async patch(
        id: number,
        student: Partial<Omit<Student, "id" | "created_at">>
    ): Promise<Student | null> {

        const fields = Object.keys(student);

        if (fields.length === 0) {
            return this.findById(id);
        }

        const values = Object.values(student);

        const setClause = fields
            .map((field, index) => `"${field}" = $${index + 1}`)
            .join(", ");

        values.push(id);

        const result = await pool.query(
            `UPDATE students
             SET ${setClause}
             WHERE id = $${values.length}
             RETURNING *`,
            values
        );

        return result.rows[0] ?? null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );

        return result.rowCount !== null && result.rowCount > 0;
    }
}