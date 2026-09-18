import { useState, type CSSProperties } from "react";
import Home from "./pages/Home";
import CostsDashboard from "./pages/CostsDashboard";

type View = "viagens" | "custos";

export default function App() {
  const [view, setView] = useState<View>("viagens");
  return (
    <>
      <nav style={{
        display: "flex", gap: 8, padding: "12px 24px",
        borderBottom: "1px solid #e3e4dc", background: "#f9f8f2"
      }}>
        <button onClick={() => setView("viagens")} style={navButtonStyle(view === "viagens")}>Viagens</button>
        <button onClick={() => setView("custos")} style={navButtonStyle(view === "custos")}>Painel de custos</button>
      </nav>
      {view === "viagens" ? <Home /> : <CostsDashboard />}
    </>
  );
}

function navButtonStyle(active: boolean): CSSProperties {
  return {
    padding: "8px 16px",
    border: "1px solid " + (active ? "#226749" : "#cfd0c8"),
    background: active ? "#226749" : "transparent",
    color: active ? "#fff" : "#173239",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 600,
  };
}
