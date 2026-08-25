import { useMemo, useState } from "react";
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
  X,
} from "lucide-react";

type TripStatus = "Rascunho" | "Solicitada" | "Aprovada" | "Rejeitada";

type Trip = {
  id: string;
  destination: string;
  period: string;
  reason: string;
  transport: string;
  status: TripStatus;
  cost: number;
  owner: string;
};

const initialTrips: Trip[] = [
  {
    id: "VG-024",
    destination: "Foz do Iguaçu · PR",
    period: "02-05 set. 2026",
    reason: "Visita técnica",
    transport: "Terrestre",
    status: "Aprovada",
    cost: 1480,
    owner: "Equipe ES2",
  },
  {
    id: "VG-023",
    destination: "Cascavel · PR",
    period: "28 ago. 2026",
    reason: "Treinamento",
    transport: "Terrestre",
    status: "Solicitada",
    cost: 620,
    owner: "Equipe ES2",
  },
  {
    id: "VG-022",
    destination: "Curitiba · PR",
    period: "10-12 set. 2026",
    reason: "Reunião com cliente",
    transport: "Aéreo",
    status: "Rascunho",
    cost: 0,
    owner: "Equipe ES2",
  },
];

const statusStyle: Record<TripStatus, string> = {
  Rascunho: "status-stamp status-draft",
  Solicitada: "status-stamp status-requested",
  Aprovada: "status-stamp status-approved",
  Rejeitada: "status-stamp status-rejected",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPeriod(start: string, end: string) {
  if (!start || !end) return "Período a definir";
  const formatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  return `${formatter.format(new Date(`${start}T12:00:00`))} - ${formatter.format(new Date(`${end}T12:00:00`))}`;
}

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [activeTrip, setActiveTrip] = useState("VG-024");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("Acompanhe o fluxo de uma viagem desde o rascunho.");
  const [form, setForm] = useState({ destination: "", start: "", end: "", reason: "", transport: "Terrestre" });

  const selectedTrip = trips.find((trip) => trip.id === activeTrip) ?? trips[0];
  const metrics = useMemo(() => {
    const approved = trips.filter((trip) => trip.status === "Aprovada");
    return {
      total: trips.length,
      approved: approved.length,
      pending: trips.filter((trip) => trip.status === "Solicitada").length,
      forecast: trips.reduce((sum, trip) => sum + trip.cost, 0),
    };
  }, [trips]);

  function updateStatus(id: string, status: TripStatus, copy: string) {
    setTrips((current) => current.map((trip) => (trip.id === id ? { ...trip, status } : trip)));
    setNotice(copy);
  }

  function createTrip(event: React.FormEvent) {
    event.preventDefault();
    if (!form.destination || !form.reason || !form.start || !form.end) {
      setNotice("Preencha destino, motivo e período para registrar o rascunho.");
      return;
    }
    if (new Date(form.end) < new Date(form.start)) {
      setNotice("A data de retorno precisa ser igual ou posterior à data de saída.");
      return;
    }
    const id = `VG-${String(25 + trips.length).padStart(3, "0")}`;
    const newTrip: Trip = {
      id,
      destination: form.destination,
      period: formatPeriod(form.start, form.end),
      reason: form.reason,
      transport: form.transport,
      status: "Rascunho",
      cost: 0,
      owner: "Equipe ES2",
    };
    setTrips((current) => [newTrip, ...current]);
    setActiveTrip(id);
    setForm({ destination: "", start: "", end: "", reason: "", transport: "Terrestre" });
    setShowForm(false);
    setNotice(`${id} foi registrado como rascunho.`);
  }

  return (
    <div className="app-shell">
      <aside className="dossier-rail" aria-label="Navegação principal">
        <div className="rail-brand">
          <span className="route-mark" aria-label="Marca gráfica do SGV"><i /><i /></span>
          <span>
            <b>SGV</b>
            <small>Sistema de Gestão<br />de Viagens</small>
          </span>
        </div>

        <nav className="rail-nav">
          <a className="active" href="#painel"><LayoutDashboard size={18} />Painel de rota</a>
          <a href="#viagens"><Route size={18} />Viagens</a>
          <a href="#fluxo"><ClipboardList size={18} />Fluxo de aprovação</a>
          <a href="#indicadores"><CircleDollarSign size={18} />Indicadores</a>
        </nav>

        <div className="rail-course-note">
          <span className="note-label">ESII · SPRINT 0</span>
          <p>Acompanhe o registro e a situação das viagens corporativas.</p>
          <div className="course-progress"><span /></div>
          <small>Estrutura técnica em organização</small>
        </div>

        <div className="rail-footer">
          <span className="avatar">GH</span>
          <span><b>Equipe ES2</b><small>Ambiente acadêmico</small></span>
          <MoreHorizontal size={18} />
        </div>
      </aside>

      <main className="workspace">
        <header className="topline">
          <div className="breadcrumbs"><span>SGV</span><ChevronRight size={14} /><strong>Visão operacional</strong></div>
          <div className="header-actions">
            <span className="demo-pill"><Sparkles size={14} /> Sistema de Gestão de Viagens</span>
            <button className="primary-action" onClick={() => setShowForm(true)}><Plus size={17} /> Nova viagem</button>
          </div>
        </header>

        <section id="painel" className="intro-grid">
          <div className="intro-copy">
            <p className="eyebrow"><Compass size={15} /> OPERAÇÃO EM FOCO</p>
            <h1>Planeje a próxima decisão<br /><em>antes de abrir a próxima viagem.</em></h1>
            <p className="intro-text">Registre, acompanhe e analise as viagens corporativas em um único ambiente.</p>
            <div className="intro-meta">
              <div><span>Fluxo</span><b>Rascunho → Solicitação → Decisão</b></div>
              <div><span>Infraestrutura</span><b>API e PostgreSQL preparados</b></div>
            </div>
          </div>
          <div className="atlas-card" aria-label="Ilustração editorial de rotas">
            <span className="atlas-route atlas-route-one" /><span className="atlas-route atlas-route-two" /><span className="atlas-point atlas-point-one" /><span className="atlas-point atlas-point-two" />
            <div className="atlas-tag"><MapPin size={15} /><span>Trajetos sob<br />controle</span></div>
          </div>
        </section>

        <section id="indicadores" className="metric-strip" aria-label="Indicadores de demonstração">
          <div className="metric"><span>VIAGENS REGISTRADAS</span><b>{String(metrics.total).padStart(2, "0")}</b><small>no cenário de hoje</small></div>
          <div className="metric"><span>PARA ANÁLISE</span><b>{String(metrics.pending).padStart(2, "0")}</b><small>aguardando decisão</small></div>
          <div className="metric"><span>JÁ APROVADAS</span><b>{String(metrics.approved).padStart(2, "0")}</b><small>com gasto liberado</small></div>
          <div className="metric highlighted"><span>VALOR PREVISTO</span><b>{formatCurrency(metrics.forecast)}</b><small>estimativa consolidada</small></div>
        </section>

        <section id="viagens" className="content-row">
          <div className="section-heading">
            <div><p className="eyebrow">REGISTROS RECENTES</p><h2>Viagens em acompanhamento</h2></div>
            <button className="text-action" onClick={() => setNotice("Selecione uma viagem para consultar os detalhes.")}>Consultar detalhes <ArrowUpRight size={16} /></button>
          </div>

          <div className="travel-ledger">
            {trips.map((trip) => (
              <button className={`trip-row ${trip.id === activeTrip ? "selected" : ""}`} key={trip.id} onClick={() => setActiveTrip(trip.id)}>
                <span className="trip-index">{trip.id}</span>
                <span className="trip-place"><b>{trip.destination}</b><small>{trip.reason} · {trip.transport}</small></span>
                <span className="trip-period"><CalendarDays size={15} />{trip.period}</span>
                <span className={statusStyle[trip.status]}>{trip.status}</span>
                <ChevronRight size={18} className="row-chevron" />
              </button>
            ))}
          </div>
        </section>

        <section id="fluxo" className="detail-layout">
          <article className="trip-detail">
            <div className="detail-top">
              <div><p className="eyebrow">REGISTRO SELECIONADO · {selectedTrip.id}</p><h2>{selectedTrip.destination}</h2><p>{selectedTrip.reason} · responsável: {selectedTrip.owner}</p></div>
              <span className={statusStyle[selectedTrip.status]}>{selectedTrip.status}</span>
            </div>

            <div className="route-timeline" aria-label="Progresso do fluxo de aprovação">
              {(["Rascunho", "Solicitada", "Aprovada"] as TripStatus[]).map((step, index) => {
                const order = ["Rascunho", "Solicitada", "Aprovada", "Rejeitada"];
                const currentIndex = order.indexOf(selectedTrip.status);
                const complete = selectedTrip.status === "Rejeitada" ? index === 0 : currentIndex >= index;
                return <div className={`route-step ${complete ? "complete" : ""}`} key={step}><span>{complete ? <Check size={13} /> : index + 1}</span><b>{step}</b></div>;
              })}
              <i />
            </div>

            <div className="detail-columns">
              <div><span>Período</span><b>{selectedTrip.period}</b></div>
              <div><span>Meio de transporte</span><b>{selectedTrip.transport}</b></div>
              <div><span>Estimativa de custo</span><b>{selectedTrip.cost ? formatCurrency(selectedTrip.cost) : "A definir"}</b></div>
            </div>

            <div className="decision-bar">
              <div><ShieldCheck size={18} /><span><b>Regra de negócio em demonstração</b><small>Somente viagens aprovadas poderão receber despesas.</small></span></div>
              {selectedTrip.status === "Rascunho" && <button className="outline-action" onClick={() => updateStatus(selectedTrip.id, "Solicitada", `${selectedTrip.id} foi submetida para análise.`)}><Send size={16} /> Submeter</button>}
              {selectedTrip.status === "Solicitada" && <div className="decision-buttons"><button className="approve-action" onClick={() => updateStatus(selectedTrip.id, "Aprovada", `${selectedTrip.id} foi aprovada.`)}><Check size={16} /> Aprovar</button><button className="reject-action" onClick={() => updateStatus(selectedTrip.id, "Rejeitada", `${selectedTrip.id} foi rejeitada.`)}><X size={16} /> Rejeitar</button></div>}
              {selectedTrip.status === "Aprovada" && <span className="ready-copy"><BadgeCheck size={17} /> Despesas liberadas</span>}
            </div>
          </article>

          <aside className="margin-note">
            <span className="note-label">NOTA DE MARGEM</span>
            <h3>Recursos do sistema</h3>
            <p>O SGV reúne o cadastro de viagens, o acompanhamento de situações e a organização das informações necessárias para análise.</p>
            <ul><li><Check size={15} /> Frontend React</li><li><Check size={15} /> API Spring Boot preparada</li><li><Check size={15} /> PostgreSQL preparado para persistência</li><li><TimerReset size={15} /> Execução com Docker</li></ul>
          </aside>
        </section>

        <section className="notice-bar" role="status"><FileText size={18} /><span>{notice}</span></section>
      </main>

      {showForm && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowForm(false)}>
          <form className="trip-form" onSubmit={createTrip} onMouseDown={(event) => event.stopPropagation()}>
            <div className="form-header"><div><p className="eyebrow">NOVO RASCUNHO</p><h2>Registrar viagem</h2></div><button type="button" className="icon-button" onClick={() => setShowForm(false)} aria-label="Fechar"><X size={18} /></button></div>
            <label>Destino<input value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })} placeholder="Ex.: Foz do Iguaçu · PR" /></label>
            <div className="form-pair"><label>Data de saída<input type="date" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} /></label><label>Data de retorno<input type="date" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} /></label></div>
            <label>Motivo<input value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} placeholder="Ex.: Visita técnica" /></label>
            <label>Meio de transporte<select value={form.transport} onChange={(event) => setForm({ ...form, transport: event.target.value })}><option>Terrestre</option><option>Aéreo</option><option>Outro</option></select></label>
            <p className="form-rule"><ShieldCheck size={15} /> O registro será criado como Rascunho.</p>
            <button className="primary-action full" type="submit"><Plus size={17} /> Registrar rascunho</button>
          </form>
        </div>
      )}
    </div>
  );
}
