import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  MapPin,
  MoreHorizontal,
  Plus,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type TripStatus = "RASCUNHO" | "SOLICITADA" | "APROVADA" | "REJEITADA";

type Employee = {
  id: string;
  registrationNumber: string;
  name: string;
  area: string;
};

type Trip = {
  id: string;
  tripNumber: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  reason: string;
  transportMode: string;
  employee: Employee;
  status: TripStatus;
  decisionJustification: string | null;
};

const statusLabel: Record<TripStatus, string> = {
  RASCUNHO: "Rascunho",
  SOLICITADA: "Solicitada",
  APROVADA: "Aprovada",
  REJEITADA: "Rejeitada",
};

const statusStyle: Record<TripStatus, string> = {
  RASCUNHO: "status-stamp status-draft",
  SOLICITADA: "status-stamp status-requested",
  APROVADA: "status-stamp status-approved",
  REJEITADA: "status-stamp status-rejected",
};

const emptyTripForm = {
  destination: "",
  departureDate: "",
  returnDate: "",
  reason: "",
  transportMode: "Terrestre",
  employeeId: "",
};

const emptyEmployeeForm = { registrationNumber: "", name: "", area: "" };

function formatPeriod(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  return `${formatter.format(new Date(`${start}T12:00:00`))} até ${formatter.format(new Date(`${end}T12:00:00`))}`;
}

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    ...options,
  });
  if (response.ok) return response.json() as Promise<T>;
  const body = await response.json().catch(() => null) as { message?: string } | null;
  throw new Error(body?.message || "Não foi possível concluir a operação.");
}

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeTripId, setActiveTripId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [tripForm, setTripForm] = useState(emptyTripForm);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployeeForm);
  const [rejectionReason, setRejectionReason] = useState("");
  const [notice, setNotice] = useState("Carregando os dados persistidos do SGV.");

  async function loadData(keepNotice = false) {
    setLoading(true);
    try {
      const [loadedTrips, loadedEmployees] = await Promise.all([
        requestJson<Trip[]>("/api/trips"),
        requestJson<Employee[]>("/api/employees"),
      ]);
      setTrips(loadedTrips);
      setEmployees(loadedEmployees);
      setActiveTripId((current) => current && loadedTrips.some((trip) => trip.id === current) ? current : loadedTrips[0]?.id);
      if (!keepNotice) setNotice("Dados carregados da API Spring Boot e do PostgreSQL.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível carregar os dados do sistema.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadData(); }, []);

  const selectedTrip = trips.find((trip) => trip.id === activeTripId);
  const metrics = useMemo(() => ({
    total: trips.length,
    pending: trips.filter((trip) => trip.status === "SOLICITADA").length,
    approved: trips.filter((trip) => trip.status === "APROVADA").length,
    employees: employees.length,
  }), [employees.length, trips]);

  async function createEmployee(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const employee = await requestJson<Employee>("/api/employees", { method: "POST", body: JSON.stringify(employeeForm) });
      setEmployees((current) => [...current, employee].sort((left, right) => left.name.localeCompare(right.name, "pt-BR")));
      setTripForm((current) => ({ ...current, employeeId: employee.id }));
      setEmployeeForm(emptyEmployeeForm);
      setShowEmployeeForm(false);
      setNotice(`${employee.name} foi cadastrado e já pode ser selecionado em uma viagem.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível cadastrar o empregado.");
    } finally {
      setSaving(false);
    }
  }

  async function createTrip(event: FormEvent) {
    event.preventDefault();
    if (!tripForm.employeeId) {
      setNotice("Selecione um empregado cadastrado para registrar a viagem.");
      return;
    }
    setSaving(true);
    try {
      const trip = await requestJson<Trip>("/api/trips", { method: "POST", body: JSON.stringify(tripForm) });
      setTrips((current) => [trip, ...current]);
      setActiveTripId(trip.id);
      setTripForm(emptyTripForm);
      setShowTripForm(false);
      setNotice(`${trip.tripNumber} foi registrada como rascunho.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível registrar a viagem.");
    } finally {
      setSaving(false);
    }
  }

  async function updateTrip(url: string, body: unknown, successMessage: string) {
    if (!selectedTrip) return;
    setSaving(true);
    try {
      const trip = await requestJson<Trip>(url, { method: "POST", body: body ? JSON.stringify(body) : undefined });
      setTrips((current) => current.map((item) => item.id === trip.id ? trip : item));
      setRejectionReason("");
      setNotice(successMessage);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível atualizar a viagem.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="dossier-rail" aria-label="Navegação principal">
        <div className="rail-brand">
          <span className="route-mark" aria-label="Marca gráfica do SGV"><i /><i /></span>
          <span><b>SGV</b><small>Sistema de Gestão<br />de Viagens</small></span>
        </div>

        <nav className="rail-nav">
          <a className="active" href="#painel"><LayoutDashboard size={18} />Painel de rota</a>
          <a href="#viagens"><Route size={18} />Viagens</a>
          <a href="#cadastros"><Users size={18} />Empregados</a>
          <a href="#fluxo"><ClipboardList size={18} />Fluxo de aprovação</a>
        </nav>

        <div className="rail-course-note">
          <span className="note-label">ESII · SPRINT 1</span>
          <p>Cadastre empregados e planeje viagens com dados persistidos.</p>
          <div className="course-progress"><span /></div>
          <small>Planejamento de viagem em evolução</small>
        </div>

        <div className="rail-footer">
          <span className="avatar">ES2</span>
          <span><b>Equipe ES2</b><small>Ambiente acadêmico</small></span>
          <MoreHorizontal size={18} />
        </div>
      </aside>

      <main className="workspace">
        <header className="topline">
          <div className="breadcrumbs"><span>SGV</span><ChevronRight size={14} /><strong>Planejamento de viagens</strong></div>
          <div className="header-actions">
            <span className="demo-pill"><Sparkles size={14} /> Dados persistidos</span>
            <button className="secondary-action" onClick={() => setShowEmployeeForm(true)}><UserPlus size={17} /> Cadastrar empregado</button>
            <button className="primary-action" onClick={() => setShowTripForm(true)} disabled={loading}><Plus size={17} /> Nova viagem</button>
          </div>
        </header>

        <section id="painel" className="intro-grid">
          <div className="intro-copy">
            <p className="eyebrow"><Compass size={15} /> PLANEJAMENTO EM FOCO</p>
            <h1>Registre a viagem<br /><em>com o empregado certo.</em></h1>
            <p className="intro-text">O planejamento registra informações obrigatórias, associa a viagem a um empregado cadastrado e inicia o fluxo na situação Rascunho.</p>
            <div className="intro-meta">
              <div><span>Fluxo</span><b>Rascunho, solicitação e decisão</b></div>
              <div><span>Persistência</span><b>PostgreSQL</b></div>
            </div>
          </div>
          <div className="atlas-card" aria-label="Ilustração editorial de rotas">
            <span className="atlas-route atlas-route-one" /><span className="atlas-route atlas-route-two" /><span className="atlas-point atlas-point-one" /><span className="atlas-point atlas-point-two" />
            <div className="atlas-tag"><MapPin size={15} /><span>Dados e rotas<br />sob controle</span></div>
          </div>
        </section>

        <section className="metric-strip" aria-label="Indicadores do planejamento">
          <div className="metric"><span>VIAGENS REGISTRADAS</span><b>{String(metrics.total).padStart(2, "0")}</b><small>dados persistidos</small></div>
          <div className="metric"><span>PARA ANÁLISE</span><b>{String(metrics.pending).padStart(2, "0")}</b><small>aguardando decisão</small></div>
          <div className="metric"><span>APROVADAS</span><b>{String(metrics.approved).padStart(2, "0")}</b><small>com decisão registrada</small></div>
          <div className="metric highlighted"><span>EMPREGADOS</span><b>{String(metrics.employees).padStart(2, "0")}</b><small>disponíveis para seleção</small></div>
        </section>

        <section id="viagens" className="content-row">
          <div className="section-heading">
            <div><p className="eyebrow">REGISTROS DO BANCO</p><h2>Viagens em acompanhamento</h2></div>
            <button className="text-action" onClick={() => void loadData(true)}><ArrowUpRight size={16} /> Atualizar dados</button>
          </div>

          <div className="travel-ledger">
            {loading && <p className="ledger-message">Carregando viagens persistidas...</p>}
            {!loading && !trips.length && <p className="ledger-message">Nenhuma viagem cadastrada. Registre o primeiro rascunho para iniciar o acompanhamento.</p>}
            {trips.map((trip) => (
              <button className={`trip-row ${trip.id === activeTripId ? "selected" : ""}`} key={trip.id} onClick={() => setActiveTripId(trip.id)}>
                <span className="trip-index">{trip.tripNumber}</span>
                <span className="trip-place"><b>{trip.destination}</b><small>{trip.reason} · {trip.employee.name}</small></span>
                <span className="trip-period"><CalendarDays size={15} />{formatPeriod(trip.departureDate, trip.returnDate)}</span>
                <span className={statusStyle[trip.status]}>{statusLabel[trip.status]}</span>
                <ChevronRight size={18} className="row-chevron" />
              </button>
            ))}
          </div>
        </section>

        <section id="cadastros" className="employee-panel">
          <div className="section-heading">
            <div><p className="eyebrow">CADASTRO BASE</p><h2>Empregados disponíveis</h2></div>
            <button className="text-action" onClick={() => setShowEmployeeForm(true)}><UserPlus size={16} /> Novo empregado</button>
          </div>
          <div className="employee-list">
            {!employees.length && <p className="ledger-message">Cadastre matrícula, nome e área para liberar o planejamento de uma viagem.</p>}
            {employees.map((employee) => <article className="employee-card" key={employee.id}><span className="employee-badge">{employee.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span><div><b>{employee.name}</b><small>Matrícula {employee.registrationNumber} · {employee.area}</small></div></article>)}
          </div>
        </section>

        {selectedTrip && <section id="fluxo" className="detail-layout">
          <article className="trip-detail">
            <div className="detail-top">
              <div><p className="eyebrow">REGISTRO SELECIONADO · {selectedTrip.tripNumber}</p><h2>{selectedTrip.destination}</h2><p>{selectedTrip.reason} · empregado: {selectedTrip.employee.name} · {selectedTrip.employee.area}</p></div>
              <span className={statusStyle[selectedTrip.status]}>{statusLabel[selectedTrip.status]}</span>
            </div>

            <div className="route-timeline" aria-label="Progresso do fluxo de aprovação">
              {(["RASCUNHO", "SOLICITADA", "APROVADA"] as TripStatus[]).map((step, index) => {
                const order: TripStatus[] = ["RASCUNHO", "SOLICITADA", "APROVADA", "REJEITADA"];
                const complete = selectedTrip.status === "REJEITADA" ? index === 0 : order.indexOf(selectedTrip.status) >= index;
                return <div className={`route-step ${complete ? "complete" : ""}`} key={step}><span>{complete ? <Check size={13} /> : index + 1}</span><b>{statusLabel[step]}</b></div>;
              })}
              <i />
            </div>

            <div className="detail-columns">
              <div><span>Período</span><b>{formatPeriod(selectedTrip.departureDate, selectedTrip.returnDate)}</b></div>
              <div><span>Meio de transporte</span><b>{selectedTrip.transportMode}</b></div>
              <div><span>Matrícula</span><b>{selectedTrip.employee.registrationNumber}</b></div>
            </div>

            <div className="decision-bar">
              <div><ShieldCheck size={18} /><span><b>Regras aplicadas na API</b><small>Datas válidas, empregado obrigatório e situação inicial Rascunho.</small></span></div>
              {selectedTrip.status === "RASCUNHO" && <button className="outline-action" disabled={saving} onClick={() => void updateTrip(`/api/trips/${selectedTrip.id}/submit`, null, `${selectedTrip.tripNumber} foi submetida para análise.`)}><Send size={16} /> Submeter</button>}
              {selectedTrip.status === "SOLICITADA" && <div className="decision-stack"><div className="decision-buttons"><button className="approve-action" disabled={saving} onClick={() => void updateTrip(`/api/trips/${selectedTrip.id}/decision`, { status: "APROVADA", justification: null }, `${selectedTrip.tripNumber} foi aprovada.`)}><Check size={16} /> Aprovar</button><button className="reject-action" disabled={saving} onClick={() => setRejectionReason((current) => current || " ")}><X size={16} /> Rejeitar</button></div>{rejectionReason !== "" && <div className="rejection-field"><input value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} placeholder="Justificativa da rejeição" /><button className="reject-action" disabled={saving} onClick={() => void updateTrip(`/api/trips/${selectedTrip.id}/decision`, { status: "REJEITADA", justification: rejectionReason }, `${selectedTrip.tripNumber} foi rejeitada.`)}>Confirmar</button></div>}</div>}
              {selectedTrip.status === "APROVADA" && <span className="ready-copy"><BadgeCheck size={17} /> Decisão registrada</span>}
              {selectedTrip.status === "REJEITADA" && <span className="rejected-copy">Rejeitada: {selectedTrip.decisionJustification}</span>}
            </div>
          </article>

          <aside className="margin-note">
            <span className="note-label">DADOS DO REGISTRO</span>
            <h3>Planejamento rastreável</h3>
            <p>O número da viagem é gerado pela API. O nome do responsável vem exclusivamente do cadastro de empregados.</p>
            <ul><li><Check size={15} /> React consumindo API</li><li><Check size={15} /> Spring Boot aplicando regras</li><li><Check size={15} /> PostgreSQL persistindo dados</li><li><TimerReset size={15} /> Docker Compose em três containers</li></ul>
          </aside>
        </section>}

        <section className="notice-bar" role="status"><FileText size={18} /><span>{notice}</span></section>
      </main>

      {showTripForm && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowTripForm(false)}>
        <form className="trip-form" onSubmit={createTrip} onMouseDown={(event) => event.stopPropagation()}>
          <div className="form-header"><div><p className="eyebrow">NOVO RASCUNHO</p><h2>Registrar viagem</h2></div><button type="button" className="icon-button" onClick={() => setShowTripForm(false)} aria-label="Fechar"><X size={18} /></button></div>
          <label>Empregado<select required value={tripForm.employeeId} onChange={(event) => setTripForm({ ...tripForm, employeeId: event.target.value })}><option value="">Selecione um empregado</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name} · {employee.registrationNumber}</option>)}</select></label>
          {!employees.length && <p className="form-rule error-copy">Cadastre pelo menos um empregado antes de registrar uma viagem.</p>}
          <label>Destino<input required value={tripForm.destination} onChange={(event) => setTripForm({ ...tripForm, destination: event.target.value })} placeholder="Ex.: Foz do Iguaçu, PR" /></label>
          <div className="form-pair"><label>Data de saída<input required type="date" value={tripForm.departureDate} onChange={(event) => setTripForm({ ...tripForm, departureDate: event.target.value })} /></label><label>Data de retorno<input required type="date" value={tripForm.returnDate} onChange={(event) => setTripForm({ ...tripForm, returnDate: event.target.value })} /></label></div>
          <label>Motivo<input required value={tripForm.reason} onChange={(event) => setTripForm({ ...tripForm, reason: event.target.value })} placeholder="Ex.: Visita técnica" /></label>
          <label>Meio de transporte<select value={tripForm.transportMode} onChange={(event) => setTripForm({ ...tripForm, transportMode: event.target.value })}><option>Terrestre</option><option>Aéreo</option><option>Ferroviário</option><option>Outro</option></select></label>
          <p className="form-rule"><ShieldCheck size={15} /> O registro será criado na situação Rascunho.</p>
          <button className="primary-action full" disabled={saving || !employees.length} type="submit"><Plus size={17} /> {saving ? "Salvando..." : "Registrar rascunho"}</button>
        </form>
      </div>}

      {showEmployeeForm && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowEmployeeForm(false)}>
        <form className="trip-form employee-form" onSubmit={createEmployee} onMouseDown={(event) => event.stopPropagation()}>
          <div className="form-header"><div><p className="eyebrow">CADASTRO BASE</p><h2>Novo empregado</h2></div><button type="button" className="icon-button" onClick={() => setShowEmployeeForm(false)} aria-label="Fechar"><X size={18} /></button></div>
          <label>Matrícula<input required value={employeeForm.registrationNumber} onChange={(event) => setEmployeeForm({ ...employeeForm, registrationNumber: event.target.value })} placeholder="Ex.: 123456" /></label>
          <label>Nome<input required value={employeeForm.name} onChange={(event) => setEmployeeForm({ ...employeeForm, name: event.target.value })} placeholder="Nome completo" /></label>
          <label>Área<input required value={employeeForm.area} onChange={(event) => setEmployeeForm({ ...employeeForm, area: event.target.value })} placeholder="Ex.: Operações" /></label>
          <p className="form-rule"><Users size={15} /> Este cadastro alimenta a seleção obrigatória de empregado nas viagens.</p>
          <button className="primary-action full" disabled={saving} type="submit"><UserPlus size={17} /> {saving ? "Salvando..." : "Cadastrar empregado"}</button>
        </form>
      </div>}
    </div>
  );
}
