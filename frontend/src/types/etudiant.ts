export interface Etudiant {
    id: number;
    nomEtudiant: string;
    prenomEtudiant: string;
    ageEtudiant: number;
    filiereEtudiant: string;
    createdAt: string;
    updatedAt: string;
}

export interface EtudiantInput {
    nomEtudiant: string;
    prenomEtudiant: string;
    ageEtudiant: number;
    filiereEtudiant: string;
}
