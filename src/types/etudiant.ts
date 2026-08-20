export interface Etudiant {
    id: number;
    nomEtudiant: string;
    prenomEtudiant: string;
    ageEtudiant: number;
    filiereEtudiant: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface EtudiantInput {
    nomEtudiant?: unknown;
    prenomEtudiant?: unknown;
    ageEtudiant?: unknown;
    filiereEtudiant?: unknown;
}
