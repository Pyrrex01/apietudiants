import { useEffect, useState } from "react";

import type { Etudiant, EtudiantInput } from "../types/etudiant";

interface EtudiantFormProps {
    etudiant: Etudiant | null;
    isSubmitting: boolean;
    onCancel: () => void;
    onSubmit: (input: EtudiantInput) => Promise<void>;
}

const emptyInput: EtudiantInput = {
    nomEtudiant: "",
    prenomEtudiant: "",
    ageEtudiant: 18,
    filiereEtudiant: "",
};

export const EtudiantForm = ({
    etudiant,
    isSubmitting,
    onCancel,
    onSubmit,
}: EtudiantFormProps) => {
    const [input, setInput] = useState<EtudiantInput>(emptyInput);

    useEffect(() => {
        setInput(
            etudiant
                ? {
                    nomEtudiant: etudiant.nomEtudiant,
                    prenomEtudiant: etudiant.prenomEtudiant,
                    ageEtudiant: etudiant.ageEtudiant,
                    filiereEtudiant: etudiant.filiereEtudiant,
                }
                : emptyInput,
        );
    }, [etudiant]);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await onSubmit(input);
    };

    return (
        <form className="etudiant-form" onSubmit={submit}>
            <div className="form-header">
                <div>
                    <p className="eyebrow">
                        {etudiant ? "Modification" : "Nouveau dossier"}
                    </p>
                    <h2>{etudiant ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>
                </div>

                {etudiant && (
                    <button className="text-button" type="button" onClick={onCancel}>
                        Annuler
                    </button>
                )}
            </div>

            <label>
                Nom
                <input
                    value={input.nomEtudiant}
                    onChange={(event) =>
                        setInput({ ...input, nomEtudiant: event.target.value })
                    }
                    required
                />
            </label>

            <label>
                Prénom
                <input
                    value={input.prenomEtudiant}
                    onChange={(event) =>
                        setInput({ ...input, prenomEtudiant: event.target.value })
                    }
                    required
                />
            </label>

            <label>
                Âge
                <input
                    type="number"
                    min="0"
                    max="150"
                    value={input.ageEtudiant}
                    onChange={(event) =>
                        setInput({ ...input, ageEtudiant: Number(event.target.value) })
                    }
                    required
                />
            </label>

            <label>
                Filière
                <input
                    value={input.filiereEtudiant}
                    onChange={(event) =>
                        setInput({ ...input, filiereEtudiant: event.target.value })
                    }
                    required
                />
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting
                    ? "Enregistrement..."
                    : etudiant
                        ? "Enregistrer"
                        : "Ajouter l'étudiant"}
            </button>
        </form>
    );
};
