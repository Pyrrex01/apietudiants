import type { Etudiant, EtudiantInput } from "../types/etudiant";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface ApiErrorResponse {
    error?: { message?: string };
}

const request = async <T>(
    path: string,
    options: RequestInit = {},
): Promise<T> => {
    const hasBody = options.body !== undefined;
    const response = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            ...(hasBody ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as ApiErrorResponse;

        throw new Error(body.error?.message ?? "La requête a échoué.");
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
};

const protectedHeaders = (token: string): HeadersInit => ({
    Authorization: `Bearer ${token}`,
});

export const login = async (userId: string): Promise<string> => {
    const response = await request<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ userId }),
    });

    return response.token;
};

export const getEtudiants = () => request<Etudiant[]>("/etudiants");

export const createEtudiant = (etudiant: EtudiantInput, token: string) =>
    request<Etudiant>("/etudiants", {
        method: "POST",
        headers: protectedHeaders(token),
        body: JSON.stringify(etudiant),
    });

export const updateEtudiant = (
    id: number,
    etudiant: EtudiantInput,
    token: string,
) =>
    request<Etudiant>(`/etudiants/${id}`, {
        method: "PUT",
        headers: protectedHeaders(token),
        body: JSON.stringify(etudiant),
    });

export const deleteEtudiant = (id: number, token: string) =>
    request<void>(`/etudiants/${id}`, {
        method: "DELETE",
        headers: protectedHeaders(token),
    });
