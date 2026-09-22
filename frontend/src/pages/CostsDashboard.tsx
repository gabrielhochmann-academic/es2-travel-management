import { useEffect, useState } from "react";

/**
 * Painel de Custos (Funcionalidade CUSTOS).
 * Endpoints consumidos:
 *   - GET  /api/trips                 -> Lista de viagens (com status e custos)
 *   - PUT  /api/trips/{id}/costs      -> Atualiza transportCost, lodgingCost, taxiCost
 *   - GET  /api/trips/indicators/costs -> Indicadores consolidados de custos
 *   - GET  /api/employees             -> Contagem total de funcionários no sistema
 */

type Trip = {
  id: string;
  destination: string;
  responsibleName: string;
  transportCost: number;
  lodgingCost: number;
  taxiCost: number;
  totalCost: number;
  status: string;
};

type CategoryIndicator = {
  category: string;
  total: number;
};

type TripCostSummary = {
  id: string;
  destination: string;
  totalCost: number;
} | null;

type Indicators = {
  tripCount: number;
  approvedTripCount?: number;
  rejectedTripCount?: number;
  grandTotalCost: number;
  averageCostPerTrip: number;
  costByCategory: CategoryIndicator[];
  mostExpensiveTrip: TripCostSummary;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

// Apenas viagens nestes status permitem edição dos custos no frontend
function isEditable(status: string): boolean {
  return (
    status === "RASCUNHO" ||
    status === "AJUSTES_SOLICITADOS" ||
    status === "APROVADA"
  );
}

export default function CostsDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [indicators, setIndicators] = useState<Indicators | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadAll() {
    setError(null);
    try {
      const [tripsResp, indicatorsResp, employeesResp] = await Promise.all([
        fetch("/api/trips"),
        fetch("/api/trips/indicators/costs"),
        fetch("/api/employees"),
      ]);

      if (!tripsResp.ok || !indicatorsResp.ok) {
        throw new Error("Falha ao consultar os dados de viagens no backend.");
      }

      const tripsData: Trip[] = await tripsResp.json();
      const indicatorsData: Indicators = await indicatorsResp.json();

      setTrips(tripsData);
      setIndicators(indicatorsData);

      if (employeesResp.ok) {
        const employeesData = await employeesResp.json();
        setEmployeeCount(employeesData.length);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível conectar ao backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  function updateLocalField(
    id: string,
    field: "transportCost" | "lodgingCost" | "taxiCost",
    value: string
  ) {
    const numberValue = Math.max(0, Number(value) || 0);
    setTrips((current) =>
      current.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, [field]: numberValue };
        return {
          ...updated,
          totalCost:
            updated.transportCost + updated.lodgingCost + updated.taxiCost,
        };
      })
    );
  }

  async function saveCosts(trip: Trip) {
    setSavingId(trip.id);
    setError(null);
    try {
      const response = await fetch(`/api/trips/${trip.id}/costs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transportCost: trip.transportCost,
          lodgingCost: trip.lodgingCost,
          taxiCost: trip.taxiCost,
        }),
      });

      if (!response.ok) {
        throw new Error("O backend recusou a atualização dos custos.");
      }

    // Recarrega os dados para garantir sincronia total com o backend
    await loadAll();
  } catch (e) {
    setError(
      e instanceof Error ? e.message : "Não foi possível salvar os custos."
    );
  } finally {
    setSavingId(null);
  }
}

  return (
    <div className="custos-dashboard">
      <style>{`
        .custos-dashboard { max-width: 980px; margin: 0 auto; padding: 32px 24px; font-family: inherit; color: #173239; }
        .custos-dashboard h1 { font-size: 22px; margin: 0 0 4px; }
        .custos-dashboard .subtitle { color: #6b7a76; font-size: 13px; margin: 0 0 22px; }
        .custos-erro { padding: 12px 14px; margin-bottom: 20px; background: #f6dfdf; color: #a44242; border-left: 3px solid #a44242; font-size: 13px; }
        .custos-indicadores { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .custos-indicador { padding: 16px; background: #f9f8f2; border: 1px solid #d7d8d0; border-radius: 4px; }
        .custos-indicador span { display: block; font-size: 10px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #78847f; margin-bottom: 6px; }
        .custos-indicador b { display: block; font-size: 20px; color: #173239; }
        .custos-indicador small { display: block; margin-top: 4px; color: #6b7a76; font-size: 11px; }
        .custos-tabela { width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 13px; }
        .custos-tabela th, .custos-tabela td { padding: 10px 12px; border-bottom: 1px solid #e3e4dc; text-align: left; }
        .custos-tabela th { font-size: 10px; letter-spacing: .05em; text-transform: uppercase; color: #78847f; }
        .custos-tabela input { width: 90px; padding: 6px 8px; border: 1px solid #cfd0c8; background: #fffefa; font: inherit; border-radius: 3px; }
        .custos-tabela input:disabled { background: #f0f1ec; color: #88938f; cursor: not-allowed; border-color: #e0e1d9; }
        .custos-tabela td.total { font-weight: 800; }
        .custos-tabela button { padding: 6px 12px; border: 1px solid #226749; color: #226749; background: transparent; cursor: pointer; font-size: 12px; border-radius: 3px; transition: all 0.2s; }
        .custos-tabela button:hover:not(:disabled) { background: #226749; color: #fff; }
        .custos-tabela button:disabled { opacity: .5; cursor: not-allowed; border-color: #88938f; color: #78847f; }
        .custos-barra-wrap { display: grid; gap: 10px; }
        .custos-barra-linha { display: grid; grid-template-columns: 110px 1fr 90px; align-items: center; gap: 10px; font-size: 12px; }
        .custos-barra-fundo { height: 10px; background: #e9ebe4; overflow: hidden; border-radius: 5px; }
        .custos-barra-preenchida { height: 100%; background: #226749; border-radius: 5px; }
      `}</style>

      <h1>Painel de Custos</h1>
      <p className="subtitle">
        Custo de deslocamento + hospedagem + táxi = custo total, calculado e persistido pelo backend.
      </p>

      {error && <p className="custos-erro">{error} — confira se o backend está rodando.</p>}
      {loading && <p>Carregando dados do backend…</p>}

      {!loading && indicators && (
        <>
          <div className="custos-indicadores">
            <div className="custos-indicador">
              <span>Custo total previsto</span>
              <b>{formatCurrency(indicators.grandTotalCost)}</b>
              <small>{indicators.tripCount} viagem(ns) cadastrada(s)</small>
            </div>
            <div className="custos-indicador">
              <span>Custo médio / viagem</span>
              <b>{formatCurrency(indicators.averageCostPerTrip)}</b>
            </div>
            <div className="custos-indicador">
              <span>Viagens aprovadas</span>
              <b>
                {indicators.approvedTripCount ??
                  trips.filter((t) => t.status === "APROVADA").length}
              </b>
              <small>Prontas para execução</small>
            </div>
            <div className="custos-indicador">
              <span>Funcionários cadastrados</span>
              <b>{employeeCount}</b>
              <small>Total no sistema</small>
            </div>
          </div>

          <div className="custos-indicadores">
            <div className="custos-indicador">
              <span>Categoria de maior peso</span>
              <b>{indicators.costByCategory[0]?.category ?? "—"}</b>
              <small>
                {formatCurrency(indicators.costByCategory[0]?.total ?? 0)} no total
              </small>
            </div>
            <div className="custos-indicador">
              <span>Viagem mais cara</span>
              <b>{indicators.mostExpensiveTrip?.destination ?? "—"}</b>
              <small>
                {indicators.mostExpensiveTrip
                  ? formatCurrency(indicators.mostExpensiveTrip.totalCost)
                  : "Sem viagens"}
              </small>
            </div>
          </div>

          <div className="custos-barra-wrap" style={{ marginBottom: 28 }}>
            {indicators.costByCategory.map((item) => {
              const percentage = indicators.grandTotalCost
                ? (item.total / indicators.grandTotalCost) * 100
                : 0;
              return (
                <div className="custos-barra-linha" key={item.category}>
                  <span>{item.category}</span>
                  <div className="custos-barra-fundo">
                    <div
                      className="custos-barra-preenchida"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span>{formatCurrency(item.total)}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!loading && (
        <table className="custos-tabela">
          <thead>
            <tr>
              <th>Viagem</th>
              <th>Deslocamento</th>
              <th>Hospedagem</th>
              <th>Táxi</th>
              <th>Custo Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((t) => {
              const editable = isEditable(t.status);
              return (
                <tr key={t.id}>
                  <td>
                    <b>{t.destination}</b>
                    <br />
                    <small>Solicitante: {t.responsibleName}</small>
                  </td>
                  <td>
                    <input
                      disabled={!editable}
                      type="number"
                      min={0}
                      value={t.transportCost}
                      onChange={(e) =>
                        updateLocalField(t.id, "transportCost", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editable}
                      type="number"
                      min={0}
                      value={t.lodgingCost}
                      onChange={(e) =>
                        updateLocalField(t.id, "lodgingCost", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editable}
                      type="number"
                      min={0}
                      value={t.taxiCost}
                      onChange={(e) =>
                        updateLocalField(t.id, "taxiCost", e.target.value)
                      }
                    />
                  </td>
                  <td className="total">{formatCurrency(t.totalCost)}</td>
                  <td>
                    <button
                      disabled={savingId === t.id || !editable}
                      onClick={() => saveCosts(t)}
                    >
                      {!editable
                        ? "Viagem encerrada"
                        : savingId === t.id
                        ? "Salvando…"
                        : "Salvar"}
                    </button>
                  </td>
                </tr>
              );
            })}
            {trips.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                  Nenhuma viagem cadastrada até o momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}