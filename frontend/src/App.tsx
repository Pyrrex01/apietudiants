import { useEffect, useMemo, useState } from "react";
import { createEtudiant, deleteEtudiant, getEtudiants, login, updateEtudiant } from "./services/api";
import { EtudiantForm } from "./components/EtudiantForm";
import { EtudiantTable } from "./components/EtudiantTable";
import type { Etudiant, EtudiantInput } from "./types/etudiant";
import "./App.css";

function App() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [selected, setSelected] = useState<Etudiant | null>(null);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("etudiants-token") ?? "");
  const [userId, setUserId] = useState(() => localStorage.getItem("etudiants-user") ?? "");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadEtudiants = async () => {
    setIsLoading(true);
    try { setEtudiants(await getEtudiants()); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Impossible de charger les étudiants."); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { void loadEtudiants(); }, []);

  const filteredEtudiants = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return etudiants;
    return etudiants.filter((etudiant) => `${etudiant.nomEtudiant} ${etudiant.prenomEtudiant} ${etudiant.filiereEtudiant}`.toLowerCase().includes(needle));
  }, [etudiants, search]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    try {
      const nextToken = await login(userId || "dashboard-user");
      setToken(nextToken); localStorage.setItem("etudiants-token", nextToken); localStorage.setItem("etudiants-user", userId || "dashboard-user");
      setMessage("Session ouverte. Les modifications sont disponibles.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Connexion impossible."); }
  };

  const handleSubmit = async (input: EtudiantInput) => {
    if (!token) { setError("Ouvre une session pour modifier les dossiers."); return; }
    setIsSubmitting(true); setError("");
    try {
      if (selected) await updateEtudiant(selected.id, input, token); else await createEtudiant(input, token);
      setSelected(null); setMessage(selected ? "Dossier mis à jour." : "Étudiant ajouté."); await loadEtudiants();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Enregistrement impossible."); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (etudiant: Etudiant) => {
    if (!token || !window.confirm(`Supprimer le dossier de ${etudiant.prenomEtudiant} ${etudiant.nomEtudiant} ?`)) return;
    setIsDeletingId(etudiant.id); setError("");
    try { await deleteEtudiant(etudiant.id, token); setMessage("Dossier supprimé."); await loadEtudiants(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Suppression impossible."); }
    finally { setIsDeletingId(null); }
  };

  const logout = () => { setToken(""); localStorage.removeItem("etudiants-token"); setMessage("Session fermée."); };
  const averageAge = etudiants.length ? Math.round(etudiants.reduce((sum, item) => sum + item.ageEtudiant, 0) / etudiants.length) : 0;

  return (
    <main className="app-shell">
      <header className="topbar"><div className="brand-mark">A<span>+</span></div><div><p className="brand-name">Campus / administration</p><p className="brand-subtitle">Dossiers étudiants</p></div><div className="topbar-spacer" />
        {token ? <div className="session"><span className="status-dot" /> Session active <button type="button" className="link-button" onClick={logout}>Se déconnecter</button></div> : <form className="login-form" onSubmit={handleLogin}><input value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="Identifiant" aria-label="Identifiant" /><button type="submit" className="dark-button">Se connecter</button></form>}
      </header>
      <section className="intro"><div><p className="eyebrow">Vue d'ensemble / 2026</p><h1>La rentrée, en un coup d'œil.</h1><p className="intro-copy">Centralisez les dossiers et gardez une vision nette de votre promotion.</p></div><div className="intro-note"><span>●</span><div><strong>Base synchronisée</strong><small>Dernière lecture en direct</small></div></div></section>
      {(error || message) && <div className={`notice ${error ? "notice-error" : "notice-success"}`}>{error || message}<button type="button" onClick={() => { setError(""); setMessage(""); }} aria-label="Fermer">×</button></div>}
      <section className="metrics"><div><span>Total étudiants</span><strong>{etudiants.length.toString().padStart(2, "0")}</strong></div><div><span>Âge moyen</span><strong>{averageAge}<small> ans</small></strong></div><div><span>Filières actives</span><strong>{new Set(etudiants.map((item) => item.filiereEtudiant)).size.toString().padStart(2, "0")}</strong></div><div className="metric-accent"><span>Accès API</span><strong><i /> En ligne</strong></div></section>
      <div className="workspace"><section className="directory"><div className="section-heading"><div><p className="eyebrow">Répertoire</p><h2>Étudiants inscrits</h2></div><div className="table-tools"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un nom ou une filière" aria-label="Rechercher" /></label><button type="button" className="refresh-button" onClick={() => void loadEtudiants()} aria-label="Actualiser">↻</button></div></div>{isLoading ? <p className="empty-state">Chargement des dossiers...</p> : <EtudiantTable etudiants={filteredEtudiants} isDeletingId={isDeletingId} onEdit={setSelected} onDelete={handleDelete} />}</section><aside className="form-panel"><EtudiantForm etudiant={selected} isSubmitting={isSubmitting} onCancel={() => setSelected(null)} onSubmit={handleSubmit} />{!token && <p className="auth-hint">Connectez-vous pour ajouter, modifier ou supprimer un dossier.</p>}</aside></div>
      <footer><span>AP Étudiants</span><span>Express API <b>•</b> sécurisé par JWT</span></footer>
    </main>
  );
}

export default App;