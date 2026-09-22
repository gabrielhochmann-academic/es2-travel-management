import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Users, BriefcaseBusiness, Building2, History, X } from "lucide-react";

type Role = "COLABORADOR" | "GESTOR";

type Area = {
  id: string;
  name: string;
};

type Cargo = {
  id: string;
  name: string;
  role: Role;
};

type Employee = {
  id: string;
  registrationNumber: string;
  name: string;
  area: Area;
  cargo: Cargo;
  role: Role;
};

type HistoryEntry = {
  id: string;
  area: Area;
  cargo: Cargo;
  role: Role;
  validFrom: string;
  validTo: string | null;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.detail || payload?.message || "A operação não pôde ser concluída.");
  }
  return response.json();
}

export default function AdminPage({
  onBack,
  onChanged,
}: {
  onBack: () => void;
  onChanged: () => void;
}) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [tab, setTab] = useState<"empregados" | "cargos" | "areas">("empregados");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Formulários
  const [employeeForm, setEmployeeForm] = useState({
    registrationNumber: "",
    name: "",
    cargoId: "",
    areaId: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const [cargoForm, setCargoForm] = useState({ name: "", role: "COLABORADOR" as Role });
  const [areaName, setAreaName] = useState("");

  // Histórico em Modal
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyEmployee, setHistoryEmployee] = useState<Employee | null>(null);

  async function loadData() {
    try {
      setError(null);
      const [areaData, cargoData, employeeData] = await Promise.all([
        request<Area[]>("/api/areas"),
        request<Cargo[]>("/api/cargos"),
        request<Employee[]>("/api/employees"),
      ]);

      setAreas(areaData);
      setCargos(cargoData);
      setEmployees(employeeData);

      setEmployeeForm((current) => ({
        ...current,
        areaId: current.areaId || areaData[0]?.id || "",
        cargoId: current.cargoId || cargoData[0]?.id || "",
      }));
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : "Não foi possível carregar os cadastros.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSaveEmployee(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const url = editingId ? `/api/employees/${editingId}` : "/api/employees";
      const method = editingId ? "PUT" : "POST";

      await request<Employee>(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeForm),
      });

      setEmployeeForm({
        registrationNumber: "",
        name: "",
        cargoId: cargos[0]?.id || "",
        areaId: areas[0]?.id || "",
      });
      setEditingId(null);
      setSuccess(editingId ? "Empregado atualizado com sucesso." : "Empregado cadastrado com sucesso.");
      
      await loadData();
      onChanged();
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : "Erro ao salvar empregado.");
    }
  }

  async function handleCreateCargo(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await request<Cargo>("/api/cargos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cargoForm),
      });
      setCargoForm({ name: "", role: "COLABORADOR" });
      setSuccess("Cargo cadastrado com sucesso.");
      await loadData();
      onChanged();
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : "Não foi possível cadastrar o cargo.");
    }
  }

  async function handleCreateArea(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await request<Area>("/api/areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: areaName }),
      });
      setAreaName("");
      setSuccess("Área cadastrada com sucesso.");
      await loadData();
      onChanged();
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : "Não foi possível cadastrar a área.");
    }
  }

  async function showHistory(emp: Employee) {
    setHistoryEmployee(emp);
    try {
      const data = await request<HistoryEntry[]>(`/api/employees/${emp.id}/history`);
      setHistory(data);
    } catch {
      setHistory([]);
    }
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <button className="outline-action" onClick={onBack}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <div>
          <p className="eyebrow">ADMINISTRAÇÃO DO SGV</p>
          <h1>Cadastros e Estrutura</h1>
        </div>
      </header>

      {error && (
        <div className="notice-bar error">
          <span>{error}</span>
          <button onClick={() => setError(null)}><X size={15} /></button>
        </div>
      )}

      {success && (
        <div className="notice-bar success">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)}><X size={15} /></button>
        </div>
      )}

      <div className="admin-tabs">
        <button className={tab === "empregados" ? "active" : ""} onClick={() => setTab("empregados")}>
          <Users size={16} /> Empregados
        </button>
        <button className={tab === "cargos" ? "active" : ""} onClick={() => setTab("cargos")}>
          <BriefcaseBusiness size={16} /> Cargos
        </button>
        <button className={tab === "areas" ? "active" : ""} onClick={() => setTab("areas")}>
          <Building2 size={16} /> Áreas
        </button>
      </div>

      {/* ABA EMPREGADOS */}
      {tab === "empregados" && (
        <section className="admin-grid">
          <form className="admin-card" onSubmit={handleSaveEmployee}>
            <p className="eyebrow">{editingId ? "EDITAR CADASTRO" : "NOVO CADASTRO"}</p>
            <h2>{editingId ? "Editar empregado" : "Empregado"}</h2>
            
            <label>
              Matrícula
              <input
                required
                pattern="[0-9]{4}-[0-9]"
                placeholder="1234-5"
                value={employeeForm.registrationNumber}
                onChange={(e) => setEmployeeForm({ ...employeeForm, registrationNumber: e.target.value })}
              />
            </label>

            <label>
              Nome
              <input
                required
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
              />
            </label>

            <label>
              Cargo
              <select
                required
                value={employeeForm.cargoId}
                onChange={(e) => setEmployeeForm({ ...employeeForm, cargoId: e.target.value })}
              >
                <option value="">Selecione</option>
                {cargos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.role}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Área
              <select
                required
                value={employeeForm.areaId}
                onChange={(e) => setEmployeeForm({ ...employeeForm, areaId: e.target.value })}
              >
                <option value="">Selecione</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="primary-action full" type="submit">
                <Plus size={16} /> {editingId ? "Salvar alterações" : "Cadastrar empregado"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="outline-action"
                  onClick={() => {
                    setEditingId(null);
                    setEmployeeForm({ registrationNumber: "", name: "", cargoId: cargos[0]?.id || "", areaId: areas[0]?.id || "" });
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-card">
            <p className="eyebrow">REGISTROS</p>
            <h2>Empregados cadastrados</h2>
            {employees.map((e) => (
              <div className="admin-list-row" key={e.id}>
                <div>
                  <b>{e.name}</b>
                  <small>{e.registrationNumber} · {e.cargo?.name} · {e.area?.name} ({e.role})</small>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    className="outline-action"
                    onClick={() => {
                      setEditingId(e.id);
                      setEmployeeForm({
                        registrationNumber: e.registrationNumber,
                        name: e.name,
                        cargoId: e.cargo?.id || cargos[0]?.id || "",
                        areaId: e.area?.id || areas[0]?.id || "",
                      });
                    }}
                  >
                    Editar
                  </button>
                  <button type="button" className="outline-action" onClick={() => showHistory(e)}>
                    <History size={15} /> Histórico
                  </button>
                </div>
              </div>
            ))}
            {!employees.length && <p className="empty-state">Nenhum empregado cadastrado.</p>}
          </div>
        </section>
      )}

      {/* ABA CARGOS */}
      {tab === "cargos" && (
        <section className="admin-grid">
          <form className="admin-card" onSubmit={handleCreateCargo}>
            <p className="eyebrow">NOVO CADASTRO</p>
            <h2>Cargo</h2>
            <label>
              Nome
              <input
                required
                value={cargoForm.name}
                onChange={(e) => setCargoForm({ ...cargoForm, name: e.target.value })}
                placeholder="Ex.: Analista"
              />
            </label>
            <label>
              Perfil
              <select
                value={cargoForm.role}
                onChange={(e) => setCargoForm({ ...cargoForm, role: e.target.value as Role })}
              >
                <option value="COLABORADOR">COLABORADOR</option>
                <option value="GESTOR">GESTOR</option>
              </select>
            </label>
            <button className="primary-action full" type="submit">
              <Plus size={16} /> Cadastrar cargo
            </button>
          </form>

          <div className="admin-card">
            <p className="eyebrow">CARGOS</p>
            <h2>Cargos cadastrados</h2>
            {cargos.map((c) => (
              <div className="admin-list-row" key={c.id}>
                <b>{c.name}</b>
                <span className="status-stamp status-requested">{c.role}</span>
              </div>
            ))}
            {!cargos.length && <p className="empty-state">Nenhum cargo cadastrado.</p>}
          </div>
        </section>
      )}

      {/* ABA ÁREAS */}
      {tab === "areas" && (
        <section className="admin-grid">
          <form className="admin-card" onSubmit={handleCreateArea}>
            <p className="eyebrow">NOVA ÁREA</p>
            <h2>Área</h2>
            <label>
              Nome
              <input
                required
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                placeholder="Ex.: Financeiro"
              />
            </label>
            <button className="primary-action full" type="submit">
              <Plus size={16} /> Cadastrar área
            </button>
          </form>

          <div className="admin-card">
            <p className="eyebrow">ÁREAS</p>
            <h2>Áreas cadastradas</h2>
            {areas.map((a) => (
              <div className="admin-list-row" key={a.id}>
                <b>{a.name}</b>
              </div>
            ))}
            {!areas.length && <p className="empty-state">Nenhuma área cadastrada.</p>}
          </div>
        </section>
      )}

      {/* MODAL DE HISTÓRICO */}
      {historyEmployee && (
        <div className="modal-backdrop">
          <div className="trip-form">
            <div className="form-header">
              <div>
                <p className="eyebrow">HISTÓRICO PROFISSIONAL</p>
                <h2>{historyEmployee.name}</h2>
              </div>
              <button className="icon-button" onClick={() => setHistoryEmployee(null)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {history.map((h, i) => (
                <div className="history-entry" key={h.id || i} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                  <b>{h.cargo?.name} · {h.area?.name} ({h.role})</b>
                  <br />
                  <small style={{ color: "#666" }}>
                    De: {new Date(h.validFrom).toLocaleString("pt-BR")} até{" "}
                    {h.validTo ? new Date(h.validTo).toLocaleString("pt-BR") : "Atual"}
                  </small>
                </div>
              ))}
              {!history.length && <p>Nenhum registro de histórico encontrado.</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}