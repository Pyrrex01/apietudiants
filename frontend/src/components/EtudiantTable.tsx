import type { Etudiant } from "../types/etudiant";

interface EtudiantTableProps {
    etudiants: Etudiant[];
    isDeletingId: number | null;
    onEdit: (etudiant: Etudiant) => void;
    onDelete: (etudiant: Etudiant) => Promise<void>;
}

export const EtudiantTable = ({
    etudiants,
    isDeletingId,
    onEdit,
    onDelete,
}: EtudiantTableProps) => {
    if (etudiants.length === 0) {
        return (
            <p className="empty-state">Aucun étudiant enregistré pour le moment.</p>
        );
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Étudiant</th>
                        <th>Âge</th>
                        <th>Filière</th>
                        <th aria-label="Actions" />
                    </tr>
                </thead>
                <tbody>
                    {etudiants.map((etudiant) => (
                        <tr key={etudiant.id}>
                            <td>
                                <strong>
                                    {etudiant.prenomEtudiant} {etudiant.nomEtudiant}
                                </strong>
                                <span>Identifiant #{etudiant.id}</span>
                            </td>
                            <td>{etudiant.ageEtudiant} ans</td>
                            <td>{etudiant.filiereEtudiant}</td>
                            <td className="actions">
                                <button
                                    className="text-button"
                                    type="button"
                                    onClick={() => onEdit(etudiant)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="danger-button"
                                    type="button"
                                    disabled={isDeletingId === etudiant.id}
                                    onClick={() => void onDelete(etudiant)}
                                >
                                    {isDeletingId === etudiant.id
                                        ? "Suppression..."
                                        : "Supprimer"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
