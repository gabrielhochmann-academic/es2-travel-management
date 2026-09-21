import { useEffect, useState } from "react";

/**
 * Painel de custos (Funcionalidade CUSTOS).
 * Endpoints consumidos (implementados no TripController):
 *   GET  /api/trips                    → lista de viagens (tabela editável)
 *   PUT  /api/trips/{id}/costs         → grava os 3 custos de uma viagem
 *   GET  /api/trips/indicators/costs   → indicadores do dashboard
 *
 * As chamadas usam caminho relativo "/api", resolvido pelo proxy do Vite (dev)
 * e pelo nginx (Docker) : não dependem de host/porta fixos.
 */

type Trip = {
  id: string;
  destination: string;
  responsibleName: string;
  transportCost: number;
  lodgingCost: number;
  taxiCost: number;
  totalCost: number;
};

type CategoryIndicator = { category: string; total: number };

type TripCostSummary = { id: string; destination: string; totalCost: number } | null;

type Indicators = {
  tripCount: number;
  approvedTripCount: number;
  rejectedTripCount: number;
  grandTotalCost: number;
  averageCostPerTrip: number;
  costByCategory: CategoryIndicator[];
  mostExpensiveTrip: TripCostSummary;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(value || 0);
}

export default function CostsDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [indicators, setIndicators] = useState<Indicators | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadAll() {
    setError(null);
    try {
      const [tripsResp, indicatorsResp] = await Promise.all([
        fetch("/api/trips"),
        fetch("/api/trips/indicators/costs"),
      ]);
      if (!tripsResp.ok || !indicatorsResp.ok) throw new Error("Falha ao consultar a API do backend.");
      setTrips(await tripsResp.json());
      setIndicators(await indicatorsResp.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível conectar ao backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateLocalField(id: string, field: "transportCost" | "lodgingCost" | "taxiCost", value: string) {
    const numberValue = Math.max(0, Number(value) || 0);
    setTrips((current) =>
      current.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, [field]: numberValue };
        return { ...updated, totalCost: updated.transportCost + updated.lodgingCost + updated.taxiCost };
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
      if (!response.ok) throw new Error("O backend recusou a atualização dos custos.");
      const indicatorsResp = await fetch("/api/trips/indicators/costs");
      setIndicators(await indicatorsResp.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível salvar os custos.");
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
        .custos-indicadores { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-bottom: 30px; }
        .custos-indicador { padding: 16px; background: #f9f8f2; border: 1px solid #d7d8d0; }
        .custos-indicador span { display: block; font-size: 10px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #78847f; margin-bottom: 6px; }
        .custos-indicador b { display: block; font-size: 20px; color: #173239; }
        .custos-indicador small { display: block; margin-top: 4px; color: #6b7a76; font-size: 11px; }
        .custos-tabela { width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 13px; }
        .custos-tabela th, .custos-tabela td { padding: 10px 12px; border-bottom: 1px solid #e3e4dc; text-align: left; }
        .custos-tabela th { font-size: 10px; letter-spacing: .05em; text-transform: uppercase; color: #78847f; }
        .custos-tabela input { width: 90px; padding: 6px 8px; border: 1px solid #cfd0c8; background: #fffefa; font: inherit; }
        .custos-tabela td.total { font-weight: 800; }
        .custos-tabela button { padding: 6px 10px; border: 1px solid #226749; color: #226749; background: transparent; cursor: pointer; font-size: 12px; }
        .custos-tabela button:disabled { opacity: .5; cursor: wait; }
        .custos-barra-wrap { display: grid; gap: 10px; }
        .custos-barra-linha { display: grid; grid-template-columns: 110px 1fr 90px; align-items: center; gap: 10px; font-size: 12px; }
        .custos-barra-fundo { height: 10px; background: #e9ebe4; overflow: hidden; }
        .custos-barra-preenchida { height: 100%; background: #226749; }
      `}</style>

      <h1>Painel de custos</h1>
      <p className="subtitle">Custo de deslocamento + hospedagem + táxi = custo total, calculado pelo backend e persistido no banco.</p>

      {error && <p className="custos-erro">{error} : confira se o backend está rodando.</p>}
      {loading && <p>Carregando dados do backend…</p>}

      {!loading && indicators && (
        <>
          <div className="custos-indicadores">
            <div className="custos-indicador">
              <span>Custo total previsto</span>
              <b>{formatCurrency(indicators.grandTotalCost)}</b>
              <small>{indicators.tripCount} viagem(ns)</small>
            </div>
            <div className="custos-indicador">
              <span>Custo médio por viagem</span>
              <b>{formatCurrency(indicators.averageCostPerTrip)}</b>
            </div>
            <div className="custos-indicador">
              <span>Viagens aprovadas</span>
              <b>{indicators.approvedTripCount}</b>
            </div>
            <div className="custos-indicador">
              <span>Viagens rejeitadas</span>
              <b>{indicators.rejectedTripCount}</b>
            </div>
            <div className="custos-indicador">
              <span>Categoria de maior peso</span>
              <b>{indicators.costByCategory[0]?.category ?? "Sem dados"}</b>
              <small>{formatCurrency(indicators.costByCategory[0]?.total ?? 0)} no total</small>
            </div>
            <div className="custos-indicador">
              <span>Viagem mais cara</span>
              <b>{indicators.mostExpensiveTrip?.destination ?? "Sem dados"}</b>
              <small>{indicators.mostExpensiveTrip ? formatCurrency(indicators.mostExpensiveTrip.totalCost) : "sem viagens"}</small>
            </div>
          </div>

          <div className="custos-barra-wrap" style={{ marginBottom: 28 }}>
            {indicators.costByCategory.map((item) => {
              const percentage = indicators.grandTotalCost ? (item.total / indicators.grandTotalCost) * 100 : 0;
              return (
                <div className="custos-barra-linha" key={item.category}>
                  <span>{item.category}</span>
                  <div className="custos-barra-fundo"><div className="custos-barra-preenchida" style={{ width: `${percentage}%` }} /></div>
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
            <tr><th>Viagem</th><th>Deslocamento</th><th>Hospedagem</th><th>Táxi</th><th>Custo total</th><th></th></tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.id}>
                <td><b>{t.destination}</b><br /><small>solicitante: {t.responsibleName}</small></td>
                <td><input type="number" min={0} value={t.transportCost} onChange={(e) => updateLocalField(t.id, "transportCost", e.target.value)} /></td>
                <td><input type="number" min={0} value={t.lodgingCost} onChange={(e) => updateLocalField(t.id, "lodgingCost", e.target.value)} /></td>
                <td><input type="number" min={0} value={t.taxiCost} onChange={(e) => updateLocalField(t.id, "taxiCost", e.target.value)} /></td>
                <td className="total">{formatCurrency(t.totalCost)}</td>
                <td><button disabled={savingId === t.id} onClick={() => saveCosts(t)}>{savingId === t.id ? "Salvando…" : "Salvar"}</button></td>
              </tr>
            ))}
            {trips.length === 0 && <tr><td colSpan={6}>Nenhuma viagem cadastrada ainda.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
