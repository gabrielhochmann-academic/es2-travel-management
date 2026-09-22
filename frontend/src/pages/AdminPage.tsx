import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Users,
  BriefcaseBusiness,
  Building2,
  History,
  X,
} from "lucide-react";

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

type AdminTab = "empregados" | "cargos" | "areas";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);

    const message =
      payload?.detail ||
      payload?.message ||
      `Erro HTTP ${response.status} - ${response.statusText}`;

    throw new Error(message);
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

  const [tab, setTab] = useState<AdminTab>("empregados");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [employeeForm, setEmployeeForm] = useState({
    registrationNumber: "",
    name: "",
    cargoId: "",
    areaId: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [cargoForm, setCargoForm] = useState({
    name: "",
    role: "COLABORADOR" as Role,
  });

  const [areaName, setAreaName] = useState("");

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyEmployee, setHistoryEmployee] =
    useState<Employee | null>(null);

  async function loadData() {
    try {
      setError(null);

      const [areaData, cargoData, employeeData] =
        await Promise.all([
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
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível carregar os cadastros."
      );
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetEmployeeForm() {
    setEditingId(null);

    setEmployeeForm({
      registrationNumber: "",
      name: "",
      cargoId: cargos[0]?.id || "",
      areaId: areas[0]?.id || "",
    });
  }

  function startEditingEmployee(employee: Employee) {
    setEditingId(employee.id);

    setEmployeeForm({
      registrationNumber: employee.registrationNumber,
      name: employee.name,
      cargoId:
        employee.cargo?.id ||
        cargos[0]?.id ||
        "",
      areaId:
        employee.area?.id ||
        areas[0]?.id ||
        "",
    });

    setError(null);
    setSuccess(null);
  }

  async function handleSaveEmployee(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const url = editingId
        ? `/api/employees/${editingId}/assignment`
        : "/api/employees";

      const method = editingId ? "PUT" : "POST";

      const body = editingId
        ? {
            cargoId: employeeForm.cargoId,
            areaId: employeeForm.areaId,
          }
        : employeeForm;

      await request<Employee>(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const wasEditing = Boolean(editingId);

      resetEmployeeForm();

      setSuccess(
        wasEditing
          ? "Alocação do empregado atualizada com sucesso."
          : "Empregado cadastrado com sucesso."
      );

      await loadData();
      onChanged();
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Erro ao salvar empregado."
      );
    }
  }

  async function handleCreateCargo(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      await request<Cargo>("/api/cargos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cargoForm),
      });

      setCargoForm({
        name: "",
        role: "COLABORADOR",
      });

      setSuccess("Cargo cadastrado com sucesso.");

      await loadData();
      onChanged();
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível cadastrar o cargo."
      );
    }
  }

  async function handleCreateArea(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      await request<Area>("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: areaName.trim(),
        }),
      });

      setAreaName("");

      setSuccess("Área cadastrada com sucesso.");

      await loadData();
      onChanged();
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível cadastrar a área."
      );
    }
  }

  async function showHistory(employee: Employee) {
    setHistoryEmployee(employee);
    setHistory([]);

    try {
      const data = await request<HistoryEntry[]>(
        `/api/employees/${employee.id}/history`
      );

      setHistory(data);
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Não foi possível carregar o histórico."
      );

      setHistory([]);
    }
  }

  function closeHistory() {
    setHistoryEmployee(null);
    setHistory([]);
  }

  return (
    <main className="admin-page">
      {/* =====================================================
          CABEÇALHO
      ====================================================== */}
      <header className="admin-header">
        <button
          type="button"
          className="outline-action"
          onClick={onBack}
          aria-label="Voltar para o painel"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div>
          <p className="eyebrow">
            ADMINISTRAÇÃO DO SGV
          </p>

          <h1>Cadastros e Estrutura</h1>
        </div>
      </header>

      {/* =====================================================
          MENSAGENS
      ====================================================== */}
      {error && (
        <div className="notice-bar error" role="alert">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Fechar mensagem de erro"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {success && (
        <div
          className="notice-bar success"
          role="status"
        >
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess(null)}
            aria-label="Fechar mensagem de sucesso"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =====================================================
          ABAS
      ====================================================== */}
      <div className="admin-tabs">
        <button
          type="button"
          className={
            tab === "empregados" ? "active" : ""
          }
          onClick={() => {
            setTab("empregados");
            setSuccess(null);
            setError(null);
          }}
        >
          <Users size={16} />
          Empregados
        </button>

        <button
          type="button"
          className={
            tab === "cargos" ? "active" : ""
          }
          onClick={() => {
            setTab("cargos");
            setSuccess(null);
            setError(null);
          }}
        >
          <BriefcaseBusiness size={16} />
          Cargos
        </button>

        <button
          type="button"
          className={
            tab === "areas" ? "active" : ""
          }
          onClick={() => {
            setTab("areas");
            setSuccess(null);
            setError(null);
          }}
        >
          <Building2 size={16} />
          Áreas
        </button>
      </div>

      {/* =====================================================
          ABA: EMPREGADOS
      ====================================================== */}
      {tab === "empregados" && (
        <section className="admin-grid">
          <form
            className="admin-card"
            onSubmit={handleSaveEmployee}
          >
            <p className="eyebrow">
              {editingId
                ? "ALTERAR ALOCAÇÃO"
                : "NOVO CADASTRO"}
            </p>

            <h2>
              {editingId
                ? "Alterar cargo e área"
                : "Empregado"}
            </h2>

            <label>
              Matrícula

              <input
                required
                disabled={Boolean(editingId)}
                pattern="[0-9]{4}-[0-9]"
                placeholder="1234-5"
                value={employeeForm.registrationNumber}
                onChange={(event) =>
                  setEmployeeForm({
                    ...employeeForm,
                    registrationNumber:
                      event.target.value,
                  })
                }
              />
            </label>

            <label>
              Nome

              <input
                required
                disabled={Boolean(editingId)}
                value={employeeForm.name}
                onChange={(event) =>
                  setEmployeeForm({
                    ...employeeForm,
                    name: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Cargo

              <select
                required
                value={employeeForm.cargoId}
                onChange={(event) =>
                  setEmployeeForm({
                    ...employeeForm,
                    cargoId: event.target.value,
                  })
                }
              >
                <option value="">
                  Selecione
                </option>

                {cargos.map((cargo) => (
                  <option
                    key={cargo.id}
                    value={cargo.id}
                  >
                    {cargo.name} · {cargo.role}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Área

              <select
                required
                value={employeeForm.areaId}
                onChange={(event) =>
                  setEmployeeForm({
                    ...employeeForm,
                    areaId: event.target.value,
                  })
                }
              >
                <option value="">
                  Selecione
                </option>

                {areas.map((area) => (
                  <option
                    key={area.id}
                    value={area.id}
                  >
                    {area.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="admin-form-actions">
              <button
                className="primary-action full"
                type="submit"
                disabled={!cargos.length || !areas.length}
              >
                <Plus size={16} />

                {editingId
                  ? "Salvar alocação"
                  : "Cadastrar empregado"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="outline-action"
                  onClick={resetEmployeeForm}
                >
                  Cancelar
                </button>
              )}
            </div>

            {!cargos.length || !areas.length ? (
              <small>
                Cadastre pelo menos um cargo e uma área
                antes de cadastrar um empregado.
              </small>
            ) : null}
          </form>

          <div className="admin-card">
            <p className="eyebrow">REGISTROS</p>

            <h2>Empregados cadastrados</h2>

            {employees.map((employee) => (
              <div
                className="admin-list-row"
                key={employee.id}
              >
                <div>
                  <b>{employee.name}</b>

                  <small>
                    {employee.registrationNumber}
                  </small>

                  <small>
                    {employee.cargo?.name} ·{" "}
                    {employee.area?.name}
                  </small>

                  <small>
                    Perfil: {employee.role}
                  </small>
                </div>

                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="outline-action"
                    onClick={() =>
                      startEditingEmployee(employee)
                    }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="outline-action"
                    onClick={() =>
                      showHistory(employee)
                    }
                  >
                    <History size={15} />
                    Histórico
                  </button>
                </div>
              </div>
            ))}

            {!employees.length && (
              <p className="empty-state">
                Nenhum empregado cadastrado.
              </p>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ABA: CARGOS
      ====================================================== */}
      {tab === "cargos" && (
        <section className="admin-grid">
          <form
            className="admin-card"
            onSubmit={handleCreateCargo}
          >
            <p className="eyebrow">
              NOVO CADASTRO
            </p>

            <h2>Cargo</h2>

            <label>
              Nome

              <input
                required
                value={cargoForm.name}
                onChange={(event) =>
                  setCargoForm({
                    ...cargoForm,
                    name: event.target.value,
                  })
                }
                placeholder="Ex.: Analista"
              />
            </label>

            <label>
              Perfil

              <select
                value={cargoForm.role}
                onChange={(event) =>
                  setCargoForm({
                    ...cargoForm,
                    role: event.target.value as Role,
                  })
                }
              >
                <option value="COLABORADOR">
                  COLABORADOR
                </option>

                <option value="GESTOR">
                  GESTOR
                </option>
              </select>
            </label>

            <button
              className="primary-action full"
              type="submit"
            >
              <Plus size={16} />
              Cadastrar cargo
            </button>
          </form>

          <div className="admin-card">
            <p className="eyebrow">CARGOS</p>

            <h2>Cargos cadastrados</h2>

            {cargos.map((cargo) => (
              <div
                className="admin-list-row"
                key={cargo.id}
              >
                <div>
                  <b>{cargo.name}</b>

                  <small>
                    Perfil associado
                  </small>
                </div>

                <span className="status-stamp status-requested">
                  {cargo.role}
                </span>
              </div>
            ))}

            {!cargos.length && (
              <p className="empty-state">
                Nenhum cargo cadastrado.
              </p>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ABA: ÁREAS
      ====================================================== */}
      {tab === "areas" && (
        <section className="admin-grid">
          <form
            className="admin-card"
            onSubmit={handleCreateArea}
          >
            <p className="eyebrow">
              NOVA ÁREA
            </p>

            <h2>Área</h2>

            <label>
              Nome

              <input
                required
                value={areaName}
                onChange={(event) =>
                  setAreaName(event.target.value)
                }
                placeholder="Ex.: Financeiro"
              />
            </label>

            <button
              className="primary-action full"
              type="submit"
            >
              <Plus size={16} />
              Cadastrar área
            </button>
          </form>

          <div className="admin-card">
            <p className="eyebrow">ÁREAS</p>

            <h2>Áreas cadastradas</h2>

            {areas.map((area) => (
              <div
                className="admin-list-row"
                key={area.id}
              >
                <b>{area.name}</b>
              </div>
            ))}

            {!areas.length && (
              <p className="empty-state">
                Nenhuma área cadastrada.
              </p>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          MODAL: HISTÓRICO DO EMPREGADO
      ====================================================== */}
      {historyEmployee && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={closeHistory}
        >
          <div
            className="trip-form"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="form-header">
              <div>
                <p className="eyebrow">
                  HISTÓRICO PROFISSIONAL
                </p>

                <h2>{historyEmployee.name}</h2>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={closeHistory}
                aria-label="Fechar histórico"
              >
                <X size={18} />
              </button>
            </div>

            <div className="history-list">
              {history.map((entry) => (
                <div
                  className="history-entry"
                  key={entry.id}
                >
                  <div>
                    <b>
                      {entry.cargo?.name} ·{" "}
                      {entry.area?.name}
                    </b>

                    <small>
                      Perfil: {entry.role}
                    </small>

                    <small>
                      De:{" "}
                      {new Date(
                        entry.validFrom
                      ).toLocaleString("pt-BR")}{" "}
                      até{" "}
                      {entry.validTo
                        ? new Date(
                            entry.validTo
                          ).toLocaleString("pt-BR")
                        : "Atual"}
                    </small>
                  </div>
                </div>
              ))}

              {!history.length && (
                <p className="empty-state">
                  Nenhum registro de histórico encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}