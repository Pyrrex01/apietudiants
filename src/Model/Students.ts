export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    age: number | null;
    major: string | null;
    gpa: number | null;
    is_enrolled: boolean;
    created_at: Date;
}