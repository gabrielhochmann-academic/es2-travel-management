import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  CircleDollarSign,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  MapPin,
  Pencil,
  Plus,
  Route,
  Send,
  ShieldCheck,
  Trash2,
  X,
  Settings,
} from "lucide-react";
import AdminPage from "./AdminPage";
import CostsDashboard from "./CostsDashboard";

type EmployeeRole = "COLABORADOR" | "GESTOR";

type TripStatus =
  | "RASCUNHO"
  | "SOLICITADA"
  | "CANCELADA"
  | "AJUSTES_SOLICITADOS"
  | "APROVADA"
  | "REJEITADA";

type View =
  | "painel"
  | "viagens"
  | "aprovacao"
  | "custos"
  | "indicadores"
  | "admin";

type Area = {
  id: string;
  name: string;
};

type Cargo = {
  id: string;
  name: string;
  role: EmployeeRole;
};

type Employee = {
  id: string;
  registrationNumber: string;
  name: string;
  area: Area;
  cargo: Cargo;
  role: EmployeeRole;
};

type StatusHistory = {
  id: string;
  status: TripStatus;
  responsibleName: string;
  justification: string | null;
  changedAt: string;
};

type Trip = {
  id: string;
  tripNumber: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  reason: string;
  transportMode: string;
  employeeId: string;
  responsibleName: string;
  employeeRegistrationNumber: string;
  employeeArea: string;
  employeeRole: EmployeeRole;
  status: TripStatus;
  decisionJustification: string | null;
  transportCost: number;
  lodgingCost: number;
  taxiCost: number;
  totalCost: number;
  statusHistory: StatusHistory[];
};

type TripForm = {
  destination: string;
  departureDate: string;
  returnDate: string;
  reason: string;
  transportMode: string;
  employeeId: string;
};

const emptyForm: TripForm = {
  destination: "",
  departureDate: "",
  returnDate: "",
  reason: "",
  transportMode: "Terrestre",
  employeeId: "",
};

const statusLabel: Record<TripStatus, string> = {
  RASCUNHO: "Rascunho",
  SOLICITADA: "Solicitada",
  CANCELADA: "Cancelada",
  AJUSTES_SOLICITADOS: "Ajustes solicitados",
  APROVADA: "Aprovada",
  REJEITADA: "Rejeitada",
};

const statusStyle: Record<TripStatus, string> = {
  RASCUNHO: "status-stamp status-draft",
  SOLICITADA: "status-stamp status-requested",
  CANCELADA: "status-stamp status-cancelled",
  AJUSTES_SOLICITADOS: "status-stamp status-adjustments",
  APROVADA: "status-stamp status-approved",
  REJEITADA: "status-stamp status-rejected",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatDate(value: string) {
  if (!value) return "Data a definir";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date(`${value}T12:00:00`));
}

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);

    throw new Error(
      payload?.detail ||
        payload?.message ||
        "A operação não pôde ser concluída."
    );
  }

  return response.json();
}

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("painel");

  const [trips, setTrips] = useState<Trip[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [managerId, setManagerId] = useState("");

  const [form, setForm] = useState<TripForm>(emptyForm);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notice, setNotice] = useState(
    "Carregando dados do sistema."
  );

  const [error, setError] = useState<string | null>(null);

  const [decisionModal, setDecisionModal] = useState<
    "AJUSTES_SOLICITADOS" | "REJEITADA" | null
  >(null);

  const [justification, setJustification] = useState("");

  const managers = employees.filter(
    (employee) => employee.role === "GESTOR"
  );

  // Na tela de aprovação, somente viagens solicitadas aparecem.
  const displayedTrips =
    currentView === "aprovacao"
      ? trips.filter((trip) => trip.status === "SOLICITADA")
      : trips;

  const selectedTrip =
    displayedTrips.find((trip) => trip.id === activeTripId) ??
    displayedTrips[0] ??
    null;

  const metrics = useMemo(() => {
  const total = trips.length;

  const pending = trips.filter(
    (trip) => trip.status === "SOLICITADA"
  ).length;

  const approved = trips.filter(
    (trip) => trip.status === "APROVADA"
  ).length;

  const rejected = trips.filter(
    (trip) => trip.status === "REJEITADA"
  ).length;

  const totalCost = trips.reduce(
    (sum, trip) => sum + Number(trip.totalCost),
    0
  );

  const averageCost =
    total > 0 ? totalCost / total : 0;

  return {
    total,
    pending,
    approved,
    rejected,
    totalCost,
    averageCost,
  };
}, [trips]);

  async function loadData() {
    setError(null);

    try {
      const [tripData, employeeData] = await Promise.all([
        request<Trip[]>("/api/trips"),
        request<Employee[]>("/api/employees"),
      ]);

      setTrips(tripData);
      setEmployees(employeeData);

      setActiveTripId(
        (current) => current ?? tripData[0]?.id ?? null
      );

      setManagerId(
        (current) =>
          current ||
          employeeData.find(
            (employee) => employee.role === "GESTOR"
          )?.id ||
          ""
      );

      setNotice(
        tripData.length
          ? "Dados atualizados pela API."
          : "Cadastre empregados e registre a primeira viagem."
      );
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível acessar a API."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreateForm() {
    setEditingTripId(null);

    setForm({
      ...emptyForm,
      employeeId: employees[0]?.id ?? "",
    });

    setShowForm(true);
  }

  function openEditForm(trip: Trip) {
    setEditingTripId(trip.id);

    setForm({
      destination: trip.destination,
      departureDate: trip.departureDate,
      returnDate: trip.returnDate,
      reason: trip.reason,
      transportMode: trip.transportMode,
      employeeId: trip.employeeId,
    });

    setShowForm(true);
  }

  async function saveTrip(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);
    setError(null);

    try {
      if (form.returnDate < form.departureDate) {
        throw new Error(
          "A data de retorno deve ser igual ou posterior à data de saída."
        );
      }

      const url = editingTripId
        ? `/api/trips/${editingTripId}`
        : "/api/trips";

      const trip = await request<Trip>(url, {
        method: editingTripId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setShowForm(false);
      setActiveTripId(trip.id);

      setNotice(
        editingTripId
          ? `${trip.tripNumber} foi atualizada.`
          : `${trip.tripNumber} foi criada como rascunho.`
      );

      await loadData();
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível salvar a viagem."
      );
    } finally {
      setSaving(false);
    }
  }

  async function runAction(
    path: string,
    body: object,
    successMessage: string
  ) {
    setSaving(true);
    setError(null);

    try {
      await request<Trip>(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setNotice(successMessage);

      await loadData();
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível concluir a ação."
      );
    } finally {
      setSaving(false);
    }
  }

  async function decide(
    status: "APROVADA" | "REJEITADA" | "AJUSTES_SOLICITADOS"
  ) {
    if (!selectedTrip || !managerId) {
      setError(
        "Cadastre ou selecione um gestor para registrar a decisão."
      );
      return;
    }

    if (status !== "APROVADA" && !decisionModal) {
      setDecisionModal(status);
      return;
    }

    if (status !== "APROVADA" && !justification.trim()) {
      setError(
        "Informe a justificativa ou o que deve ser ajustado."
      );
      return;
    }

    await runAction(
      `/api/trips/${selectedTrip.id}/decision`,
      {
        status,
        managerId,
        justification: justification.trim() || null,
      },
      `${selectedTrip.tripNumber} foi atualizada para ${statusLabel[
        status
      ].toLowerCase()}.`
    );

    setDecisionModal(null);
    setJustification("");
  }

  return (
    <div className="app-shell">
      <aside
        className="dossier-rail"
        aria-label="Navegação principal"
      >
        <div className="rail-brand">
          <span className="route-mark" aria-label="Marca do SGV">
            <i />
            <i />
          </span>

          <span>
            <b>SGV</b>
            <small>
              Sistema de Gestão
              <br />
              de Viagens
            </small>
          </span>
        </div>

        <nav className="rail-nav">
          <button
            className={`rail-link ${
              currentView === "painel" ? "active" : ""
            }`}
            onClick={() => setCurrentView("painel")}
          >
            <LayoutDashboard size={18} />
            Painel
          </button>

          <button
            className={`rail-link ${
              currentView === "viagens" ? "active" : ""
            }`}
            onClick={() => setCurrentView("viagens")}
          >
            <Route size={18} />
            Viagens
          </button>

          <button
            className={`rail-link ${
              currentView === "aprovacao" ? "active" : ""
            }`}
            onClick={() => setCurrentView("aprovacao")}
          >
            <ClipboardList size={18} />
            Aprovação
          </button>

          <button
            className={`rail-link ${
              currentView === "custos" ? "active" : ""
            }`}
            onClick={() => setCurrentView("custos")}
          >
            <CircleDollarSign size={18} />
            Custos
          </button>

          <button
            className={`rail-link ${
              currentView === "indicadores" ? "active" : ""
            }`}
            onClick={() => setCurrentView("indicadores")}
          >
            <Compass size={18} />
            Indicadores
          </button>

          <button
            className={`rail-link ${
              currentView === "admin" ? "active" : ""
            }`}
            onClick={() => setCurrentView("admin")}
          >
            <Settings size={18} />
            Administração
          </button>
        </nav>

        <div className="rail-footer">
          <span className="avatar">SGV</span>

          <span>
            <b>SGV Enterprise</b>
            <small>v0.1.0 • Produção</small>
          </span>
        </div>
      </aside>

      <main className="workspace">
        <header className="topline">
          <div className="breadcrumbs">
            <span>SGV</span>
            <strong>{currentView.toUpperCase()}</strong>
          </div>

          {(currentView === "painel" ||
            currentView === "viagens") && (
            <div className="header-actions">
              <button
                className="primary-action"
                onClick={openCreateForm}
                disabled={!employees.length}
              >
                <Plus size={17} />
                Nova viagem
              </button>
            </div>
          )}
        </header>

        {error && <p className="system-error">{error}</p>}

        {loading && (
          <p className="notice-bar">
            Carregando dados...
          </p>
        )}

        {/* =====================================================
            VIEW: PAINEL
        ====================================================== */}
        {currentView === "painel" && (
          <>
            <section className="intro-grid">
              <div className="intro-copy">
                <p className="eyebrow">
                  <Compass size={15} />
                  GESTÃO DE VIAGENS
                </p>

                <h1>
                  Planejamento, decisão
                  <br />
                  <em>e custos em um só fluxo.</em>
                </h1>

                <p className="intro-text">
                  Registre viagens vinculadas a empregados,
                  acompanhe cada mudança de situação e mantenha
                  os custos organizados.
                </p>
              </div>

              <div className="atlas-card">
                <span className="atlas-route atlas-route-one" />
                <span className="atlas-route atlas-route-two" />
                <span className="atlas-point atlas-point-one" />
                <span className="atlas-point atlas-point-two" />

                <div className="atlas-tag">
                  <MapPin size={15} />
                  <span>
                    Viagens sob
                    <br />
                    controle
                  </span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* =====================================================
    VIEW: INDICADORES
===================================================== */}
{currentView === "indicadores" && (
  <>
    <section className="content-row">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ANÁLISE</p>
          <h2>Indicadores gerenciais</h2>
        </div>
      </div>
    </section>

<section className="metric-strip indicator-grid">      <div className="metric">
        <span>VIAGENS</span>
        <b>{metrics.total}</b>
        <small>registros persistidos</small>
      </div>

      <div className="metric">
        <span>PARA ANÁLISE</span>
        <b>{metrics.pending}</b>
        <small>solicitações abertas</small>
      </div>

      <div className="metric">
        <span>APROVADAS</span>
        <b>{metrics.approved}</b>
        <small>fluxos concluídos</small>
      </div>

      <div className="metric">
        <span>REJEITADAS</span>
        <b>{metrics.rejected}</b>
        <small>fluxos encerrados</small>
      </div>

      <div className="metric highlighted">
        <span>CUSTO TOTAL</span>
        <b>{formatCurrency(metrics.totalCost)}</b>
        <small>valor consolidado</small>
      </div>

      <div className="metric">
        <span>CUSTO MÉDIO</span>
        <b>{formatCurrency(metrics.averageCost)}</b>
        <small>por viagem</small>
      </div>
    </section>
  </>
)}
        {/* =====================================================
            VIEW: CUSTOS
        ====================================================== */}
        {currentView === "custos" && <CostsDashboard />}

        {/* =====================================================
            VIEWS: VIAGENS E APROVAÇÃO
        ====================================================== */}
        {(currentView === "viagens" ||
          currentView === "aprovacao") && (
          <>
            <section className="content-row">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">REGISTROS</p>

                  <h2>
                    {currentView === "aprovacao"
                      ? "Aguardando aprovação"
                      : "Viagens cadastradas"}
                  </h2>
                </div>
              </div>

              <div className="travel-ledger">
                {displayedTrips.map((trip) => (
                  <button
                    className={`trip-row ${
                      trip.id === selectedTrip?.id
                        ? "selected"
                        : ""
                    }`}
                    key={trip.id}
                    onClick={() =>
                      setActiveTripId(trip.id)
                    }
                  >
                    <span className="trip-index">
                      {trip.tripNumber}
                    </span>

                    <span className="trip-place">
                      <b>{trip.destination}</b>
                      <small>
                        {trip.reason} ·{" "}
                        {trip.responsibleName}
                      </small>
                    </span>

                    <span className="trip-period">
                      <CalendarDays size={15} />
                      {formatDate(trip.departureDate)} a{" "}
                      {formatDate(trip.returnDate)}
                    </span>

                    <span
                      className={
                        statusStyle[trip.status]
                      }
                    >
                      {statusLabel[trip.status]}
                    </span>

                    <Route
                      size={18}
                      className="row-chevron"
                    />
                  </button>
                ))}

                {!displayedTrips.length && !loading && (
                  <p className="empty-state">
                    Nenhuma viagem encontrada nesta categoria.
                  </p>
                )}
              </div>
            </section>

            {/* =================================================
                DETALHES, AÇÕES E HISTÓRICO
            ================================================== */}
            {selectedTrip && (
              <section className="detail-layout">
                <article className="trip-detail">
                  <div className="detail-top">
                    <div>
                      <p className="eyebrow">
                        {selectedTrip.tripNumber}
                      </p>

                      <h2>{selectedTrip.destination}</h2>

                      <p>
                        {selectedTrip.reason} · solicitante:{" "}
                        {selectedTrip.responsibleName}
                      </p>

                      <div
                        className="cost-summary"
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          gap: "16px",
                          flexWrap: "wrap",
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>
                          Deslocamento{" "}
                          <b>
                            {formatCurrency(
                              selectedTrip.transportCost
                            )}
                          </b>
                        </span>

                        <span>
                          Hospedagem{" "}
                          <b>
                            {formatCurrency(
                              selectedTrip.lodgingCost
                            )}
                          </b>
                        </span>

                        <span>
                          Táxi{" "}
                          <b>
                            {formatCurrency(
                              selectedTrip.taxiCost
                            )}
                          </b>
                        </span>

                        <strong>
                          Total{" "}
                          <b>
                            {formatCurrency(
                              selectedTrip.totalCost
                            )}
                          </b>
                        </strong>
                      </div>
                    </div>

                    <span
                      className={
                        statusStyle[selectedTrip.status]
                      }
                    >
                      {statusLabel[selectedTrip.status]}
                    </span>
                  </div>

                  {(selectedTrip.status === "AJUSTES_SOLICITADOS" ||
  selectedTrip.status === "REJEITADA") &&
  selectedTrip.decisionJustification && (
    <div className="adjustment-request">
      <div className="adjustment-request-header">
        {selectedTrip.status === "REJEITADA" ? (
          <X size={16} />
        ) : (
          <Pencil size={16} />
        )}

        <strong>
          {selectedTrip.status === "REJEITADA"
            ? "Motivo da recusa"
            : "Ajustes solicitados pelo gestor"}
        </strong>
      </div>

      <p>{selectedTrip.decisionJustification}</p>
    </div>
  )}

                  <div className="detail-columns">
                    <div>
                      <span>Período</span>

                      <b>
                        {formatDate(
                          selectedTrip.departureDate
                        )}{" "}
                        a{" "}
                        {formatDate(
                          selectedTrip.returnDate
                        )}
                      </b>
                    </div>

                    <div>
                      <span>Transporte</span>
                      <b>{selectedTrip.transportMode}</b>
                    </div>

                    <div>
                      <span>Empregado</span>

                      <b>
                        {
                          selectedTrip.employeeRegistrationNumber
                        }{" "}
                        · {selectedTrip.employeeArea} ·{" "}
                        {selectedTrip.employeeRole}
                      </b>
                    </div>
                  </div>

                  <div className="decision-bar actions-wrap">
                    {(selectedTrip.status === "RASCUNHO" ||
                      selectedTrip.status ===
                        "AJUSTES_SOLICITADOS") && (
                      <div className="decision-buttons">
                        <button
                          className="outline-action"
                          onClick={() =>
                            openEditForm(selectedTrip)
                          }
                        >
                          <Pencil size={15} />
                          Editar
                        </button>

                        <button
                          className="approve-action"
                          disabled={saving}
                          onClick={() =>
                            runAction(
                              `/api/trips/${selectedTrip.id}/submit`,
                              {
                                employeeId:
                                  selectedTrip.employeeId,
                              },
                              `${selectedTrip.tripNumber} foi submetida.`
                            )
                          }
                        >
                          <Send size={15} />
                          Submeter
                        </button>

                        {selectedTrip.status ===
                          "RASCUNHO" && (
                          <button
                            className="reject-action"
                            disabled={saving}
                            onClick={() =>
                              runAction(
                                `/api/trips/${selectedTrip.id}/cancel`,
                                {
                                  employeeId:
                                    selectedTrip.employeeId,
                                },
                                `${selectedTrip.tripNumber} foi cancelada.`
                              )
                            }
                          >
                            <Trash2 size={15} />
                            Cancelar
                          </button>
                        )}
                      </div>
                    )}

                    {selectedTrip.status ===
                      "SOLICITADA" && (
                      <div className="manager-actions">
                        <select
                          value={managerId}
                          onChange={(event) =>
                            setManagerId(
                              event.target.value
                            )
                          }
                          aria-label="Gestor responsável"
                        >
                          <option value="">
                            Selecione o gestor
                          </option>

                          {managers.map((manager) => (
                            <option
                              key={manager.id}
                              value={manager.id}
                            >
                              {manager.name}
                            </option>
                          ))}
                        </select>

                        <div className="decision-buttons">
                          <button
                            className="approve-action"
                            disabled={saving}
                            onClick={() =>
                              decide("APROVADA")
                            }
                          >
                            <Check size={15} />
                            Aprovar
                          </button>

                          <button
                            className="outline-action"
                            disabled={saving}
                            onClick={() =>
                              setDecisionModal(
                                "AJUSTES_SOLICITADOS"
                              )
                            }
                          >
                            <Pencil size={15} />
                            Solicitar ajustes
                          </button>

                          <button
                            className="reject-action"
                            disabled={saving}
                            onClick={() =>
                              setDecisionModal("REJEITADA")
                            }
                          >
                            <X size={15} />
                            Rejeitar
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedTrip.status ===
                      "APROVADA" && (
                      <span className="ready-copy">
                        <BadgeCheck size={17} />
                        Viagem aprovada
                      </span>
                    )}
                  </div>

                  <div className="history-panel">
                    <h3>Histórico da viagem</h3>

                    {selectedTrip.statusHistory.map(
                      (entry) => (
                        <div
                          className="history-entry"
                          key={
                            entry.id ||
                            `${entry.status}-${entry.changedAt}`
                          }
                        >
                          <span
                            className={
                              statusStyle[entry.status]
                            }
                          >
                            {statusLabel[entry.status]}
                          </span>

                          <div>
                            <b>{entry.responsibleName}</b>

                            <small>
                              {new Intl.DateTimeFormat(
                                "pt-BR",
                                {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                }
                              ).format(
                                new Date(entry.changedAt)
                              )}
                            </small>

                            {entry.justification && (
                              <p>
                                {entry.justification}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </article>

                <aside className="margin-note">
                  <span className="note-label">
                    CONTEXTO DA SOLICITAÇÃO
                  </span>

                  <h3>{selectedTrip.responsibleName}</h3>

                  <p>
                    O cargo e a área ficam registrados
                    conforme o momento da submissão.
                  </p>

                  <ul>
                    <li>
                      <Check size={15} />
                      Matrícula:{" "}
                      {
                        selectedTrip.employeeRegistrationNumber
                      }
                    </li>

                    <li>
                      <Check size={15} />
                      Área: {selectedTrip.employeeArea}
                    </li>

                    <li>
                      <Check size={15} />
                      Cargo: {selectedTrip.employeeRole}
                    </li>

                    <li>
                      <Check size={15} />
                      Custo:{" "}
                      {formatCurrency(
                        selectedTrip.totalCost
                      )}
                    </li>
                  </ul>
                </aside>
              </section>
            )}
          </>
        )}

        {/* =====================================================
            VIEW: ADMINISTRAÇÃO
        ====================================================== */}
        {currentView === "admin" && (
          <AdminPage
            onBack={() => setCurrentView("painel")}
            onChanged={loadData}
          />
        )}

        <section
          className="notice-bar"
          role="status"
        >
          <FileText size={18} />
          <span>{notice}</span>
        </section>
      </main>

      {/* =======================================================
          MODAL DE DECISÃO DO GESTOR
      ======================================================== */}
      {decisionModal && (
        <div className="modal-backdrop">
          <div className="trip-form">
            <div className="form-header">
              <div>
                <p className="eyebrow">
                  DECISÃO DO GESTOR
                </p>

                <h2>
                  {decisionModal === "REJEITADA"
                    ? "Rejeitar viagem"
                    : "Solicitar ajustes"}
                </h2>
              </div>

              <button
                className="icon-button"
                onClick={() =>
                  setDecisionModal(null)
                }
              >
                <X size={18} />
              </button>
            </div>

            <label>
              {decisionModal === "REJEITADA"
                ? "Justificativa da rejeição"
                : "O que deve ser ajustado?"}

              <textarea
                rows={5}
                value={justification}
                onChange={(event) =>
                  setJustification(event.target.value)
                }
                placeholder="Digite os detalhes..."
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "6px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>

            <button
              className="primary-action full"
              onClick={() =>
                decide(decisionModal)
              }
            >
              Confirmar decisão
            </button>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL DE CADASTRO / EDIÇÃO
      ======================================================== */}
      {showForm && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setShowForm(false)}
        >
          <form
            className="trip-form"
            onSubmit={saveTrip}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="form-header">
              <div>
                <p className="eyebrow">
                  {editingTripId
                    ? "EDITAR VIAGEM"
                    : "NOVA VIAGEM"}
                </p>

                <h2>
                  {editingTripId
                    ? "Atualizar dados"
                    : "Registrar rascunho"}
                </h2>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() =>
                  setShowForm(false)
                }
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <label>
              Empregado

              <select
                required
                disabled={Boolean(editingTripId)}
                value={form.employeeId}
                onChange={(event) =>
                  setForm({
                    ...form,
                    employeeId:
                      event.target.value,
                  })
                }
              >
                <option value="">
                  Selecione
                </option>

                {employees.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.registrationNumber} ·{" "}
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Destino

              <input
                required
                value={form.destination}
                onChange={(event) =>
                  setForm({
                    ...form,
                    destination:
                      event.target.value,
                  })
                }
              />
            </label>

            <div className="form-pair">
              <label>
                Data de saída

                <input
                  required
                  type="date"
                  value={form.departureDate}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      departureDate:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Data de retorno

                <input
                  required
                  type="date"
                  value={form.returnDate}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      returnDate:
                        event.target.value,
                    })
                  }
                />
              </label>
            </div>

            <label>
              Motivo

              <input
                required
                value={form.reason}
                onChange={(event) =>
                  setForm({
                    ...form,
                    reason: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Meio de transporte

              <select
                value={form.transportMode}
                onChange={(event) =>
                  setForm({
                    ...form,
                    transportMode:
                      event.target.value,
                  })
                }
              >
                <option>Terrestre</option>
                <option>Aéreo</option>
                <option>Outro</option>
              </select>
            </label>

            <div
              className="form-rule"
              style={{
                marginTop: "8px",
                fontSize: "0.9rem",
              }}
            >
              <ShieldCheck size={15} />
              Os custos são registrados no painel de
              custos após a criação da viagem.
            </div>

            <button
              className="primary-action full"
              disabled={saving}
              type="submit"
            >
              <Plus size={17} />

              {saving
                ? "Salvando..."
                : "Salvar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}