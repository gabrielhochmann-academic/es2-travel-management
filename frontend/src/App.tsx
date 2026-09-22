import { useState } from "react";
import CostsDashboard from "./pages/CostsDashboard";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";

type View = "viagens" | "empregados" | "custos";

export default function App() {
  const [view, setView] = useState<View>("viagens");

  return (
    <>
      <nav className="module-nav" aria-label="Módulos do SGV">
        <button 
          className={view === "viagens" ? "active" : ""} 
          onClick={() => setView("viagens")}
        >
          Viagens
        </button>
        <button 
          className={view === "empregados" ? "active" : ""} 
          onClick={() => setView("empregados")}
        >
          Empregados
        </button>
        <button 
          className={view === "custos" ? "active" : ""} 
          onClick={() => setView("custos")}
        >
          Custos
        </button>
      </nav>

      {view === "viagens" && <Home />}
      
      {view === "empregados" && (
        <AdminPage 
          onBack={() => setView("viagens")} 
          onChanged={() => {}} 
        />
      )}
      
      {view === "custos" && <CostsDashboard />}
    </>
  );
}