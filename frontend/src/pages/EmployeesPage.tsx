import { useEffect, useState } from "react";
import { BriefcaseBusiness, Building2, History, Plus, Save, UserRound } from "lucide-react";

type Role = "COLABORADOR" | "GESTOR";
type Area = { id: string; name: string };
type Cargo = { id: string; name: string; role: Role };
type Employee = { id: string; registrationNumber: string; name: string; area: Area; cargo: Cargo; role: Role };
type HistoryEntry = { id: string; area: Area; cargo: Cargo; role: Role; validFrom: string; validTo: string | null };

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.detail || payload?.message || "A operação não pôde ser concluída.");
  }
  return response.json();
}

export default function EmployeesPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [areaName, setAreaName] = useState("");
  const [cargoForm, setCargoForm] = useState({ name: "", role: "COLABORADOR" as Role });
  const [employeeForm, setEmployeeForm] = useState({ registrationNumber: "", name: "", areaId: "", cargoId: "" });
  const [history, setHistory] = useState<Record<string, HistoryEntry[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState("Cadastre áreas e cargos antes de incluir empregados.");

  async function loadData() {
    try {
      const [areaData, cargoData, employeeData] = await Promise.all([
        request<Area[]>("/api/areas"), request<Cargo[]>("/api/cargos"), request<Employee[]>("/api/employees"),
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

  useEffect(() => { loadData(); }, []);

  async function createArea(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await request<Area>("/api/areas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: areaName }) });
      setAreaName(""); setNotice("Área cadastrada."); await loadData();
    } catch (exception) { setError(exception instanceof Error ? exception.message : "Não foi possível cadastrar a área."); }
  }

  async function createCargo(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await request<Cargo>("/api/cargos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cargoForm) });
      setCargoForm({ name: "", role: "COLABORADOR" }); setNotice("Cargo cadastrado."); await loadData();
    } catch (exception) { setError(exception instanceof Error ? exception.message : "Não foi possível cadastrar o cargo."); }
  }

  async function createEmployee(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await request<Employee>("/api/employees", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(employeeForm) });
      setEmployeeForm({ registrationNumber: "", name: "", areaId: areas[0]?.id || "", cargoId: cargos[0]?.id || "" });
      setNotice("Empregado cadastrado com histórico inicial."); await loadData();
    } catch (exception) { setError(exception instanceof Error ? exception.message : "Não foi possível cadastrar o empregado."); }
  }

  async function updateAssignment(employee: Employee, areaId: string, cargoId: string) {
    setError(null);
    try {
      await request<Employee>(`/api/employees/${employee.id}/assignment`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ areaId, cargoId }) });
      setNotice(`Cargo e área de ${employee.name} foram atualizados.`); await loadData(); await loadHistory(employee.id);
    } catch (exception) { setError(exception instanceof Error ? exception.message : "Não foi possível atualizar o empregado."); }
  }

  async function loadHistory(employeeId: string) {
    try {
      const data = await request<HistoryEntry[]>(`/api/employees/${employeeId}/history`);
      setHistory((current) => ({ ...current, [employeeId]: data }));
    } catch (exception) { setError(exception instanceof Error ? exception.message : "Não foi possível carregar o histórico."); }
  }

  return (
    <main className="admin-page">
      <header className="admin-header"><div><p className="eyebrow">CADASTROS</p><h1>Empregados e estrutura organizacional</h1><p>As viagens registram empregado, cargo e área no momento da solicitação.</p></div><UserRound size={42} /></header>
      {error && <p className="system-error">{error}</p>}<p className="notice-bar">{notice}</p>
      <section className="admin-grid">
        <form className="admin-card" onSubmit={createArea}><Building2 size={22} /><h2>Nova área</h2><label>Nome<input required value={areaName} onChange={(event) => setAreaName(event.target.value)} placeholder="Ex.: Informática" /></label><button className="primary-action" type="submit"><Plus size={16} /> Cadastrar área</button></form>
        <form className="admin-card" onSubmit={createCargo}><BriefcaseBusiness size={22} /><h2>Novo cargo</h2><label>Nome<input required value={cargoForm.name} onChange={(event) => setCargoForm({ ...cargoForm, name: event.target.value })} placeholder="Ex.: Analista de sistemas" /></label><label>Perfil<select value={cargoForm.role} onChange={(event) => setCargoForm({ ...cargoForm, role: event.target.value as Role })}><option value="COLABORADOR">Colaborador</option><option value="GESTOR">Gestor</option></select></label><button className="primary-action" type="submit"><Plus size={16} /> Cadastrar cargo</button></form>
        <form className="admin-card" onSubmit={createEmployee}><UserRound size={22} /><h2>Novo empregado</h2><div className="form-pair"><label>Matrícula<input required pattern="[0-9]{4}-[0-9]" value={employeeForm.registrationNumber} onChange={(event) => setEmployeeForm({ ...employeeForm, registrationNumber: event.target.value })} placeholder="1234-5" /></label><label>Nome<input required value={employeeForm.name} onChange={(event) => setEmployeeForm({ ...employeeForm, name: event.target.value })} /></label></div><div className="form-pair"><label>Área<select required value={employeeForm.areaId} onChange={(event) => setEmployeeForm({ ...employeeForm, areaId: event.target.value })}><option value="">Selecione</option>{areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></label><label>Cargo<select required value={employeeForm.cargoId} onChange={(event) => setEmployeeForm({ ...employeeForm, cargoId: event.target.value })}><option value="">Selecione</option>{cargos.map((cargo) => <option key={cargo.id} value={cargo.id}>{cargo.name} ({cargo.role === "GESTOR" ? "Gestor" : "Colaborador"})</option>)}</select></label></div><button className="primary-action" type="submit" disabled={!areas.length || !cargos.length}><Plus size={16} /> Cadastrar empregado</button></form>
      </section>
      <section className="employee-list"><div className="section-heading"><div><p className="eyebrow">EQUIPE</p><h2>Empregados cadastrados</h2></div></div>{employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} areas={areas} cargos={cargos} history={history[employee.id]} onSave={updateAssignment} onHistory={() => loadHistory(employee.id)} />)}{!employees.length && <p className="empty-state">Nenhum empregado cadastrado.</p>}</section>
    </main>
  );
}

function EmployeeCard({ employee, areas, cargos, history, onSave, onHistory }: { employee: Employee; areas: Area[]; cargos: Cargo[]; history?: HistoryEntry[]; onSave: (employee: Employee, areaId: string, cargoId: string) => void; onHistory: () => void; }) {
  const [areaId, setAreaId] = useState(employee.area.id);
  const [cargoId, setCargoId] = useState(employee.cargo.id);
  useEffect(() => { setAreaId(employee.area.id); setCargoId(employee.cargo.id); }, [employee.area.id, employee.cargo.id]);
  return <article className="employee-card"><div className="employee-summary"><span className="avatar">{employee.name.slice(0, 2).toUpperCase()}</span><div><b>{employee.name}</b><small>{employee.registrationNumber} · {employee.role === "GESTOR" ? "Gestor" : "Colaborador"}</small></div></div><label>Área<select value={areaId} onChange={(event) => setAreaId(event.target.value)}>{areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}</select></label><label>Cargo<select value={cargoId} onChange={(event) => setCargoId(event.target.value)}>{cargos.map((cargo) => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)}</select></label><div className="employee-actions"><button className="outline-action" onClick={() => onSave(employee, areaId, cargoId)}><Save size={15} /> Salvar</button><button className="text-action" onClick={onHistory}><History size={15} /> Histórico</button></div>{history && <div className="employment-history">{history.map((entry) => <p key={entry.id}><b>{entry.cargo.name} · {entry.area.name}</b><span>{new Date(entry.validFrom).toLocaleString("pt-BR")} até {entry.validTo ? new Date(entry.validTo).toLocaleString("pt-BR") : "atual"}</span></p>)}</div>}</article>;
}
