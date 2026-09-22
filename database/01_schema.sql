-- ============================================================
-- SGV: Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------
-- Cadastros base
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cargos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    CONSTRAINT chk_cargo_role CHECK (role IN ('COLABORADOR', 'GESTOR'))
);

CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(6) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    area_id UUID NOT NULL REFERENCES areas(id),
    cargo_id UUID NOT NULL REFERENCES cargos(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_employee_registration CHECK (registration_number ~ '^[0-9]{4}-[0-9]$')
);

-- ---------------------------------------------------------
-- Histórico do empregado (cargo/área ao longo do tempo)
-- "role" foi removido daqui: é derivável via
-- cargo_id -> cargos.role, e manter os dois abre espaço para
-- os dois campos divergirem.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS employment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    area_id UUID NOT NULL REFERENCES areas(id),
    cargo_id UUID NOT NULL REFERENCES cargos(id),
    valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
    valid_to TIMESTAMPTZ,
    CONSTRAINT chk_history_period CHECK (valid_to IS NULL OR valid_to >= valid_from)
);

-- ---------------------------------------------------------
-- Viagem
-- employee_id é NOT NULL (empregado é campo obrigatório).
-- Os campos employee_* são o snapshot congelado no momento da
-- solicitação -- não mudam se o empregado mudar de cargo/área
-- depois. employee_role tem o mesmo CHECK igual ao de cargos.role,
-- porque representa a mesma classificação e não devia aceitar
-- valores que as outras duas tabelas rejeitam.
-- ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_number VARCHAR(20) NOT NULL UNIQUE,
    destination VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    reason VARCHAR(500) NOT NULL,
    transport_mode VARCHAR(255) NOT NULL,
    employee_id UUID NOT NULL REFERENCES employees(id),
    employee_name VARCHAR(150) NOT NULL,
    employee_registration_number VARCHAR(6) NOT NULL,
    employee_area VARCHAR(100) NOT NULL,
    employee_cargo VARCHAR(100) NOT NULL,
    employee_role VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'RASCUNHO',
    decision_justification VARCHAR(500),
    transport_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    lodging_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    taxi_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_trip_period CHECK (return_date >= departure_date),
    CONSTRAINT chk_trip_status CHECK (status IN ('RASCUNHO', 'SOLICITADA', 'CANCELADA', 'AJUSTES_SOLICITADOS', 'APROVADA', 'REJEITADA')),
    CONSTRAINT chk_trip_employee_role CHECK (employee_role IN ('COLABORADOR', 'GESTOR')),
    CONSTRAINT chk_trip_costs CHECK (transport_cost >= 0 AND lodging_cost >= 0 AND taxi_cost >= 0)
);

-- total_cost NÃO é coluna: é transport_cost + lodging_cost + taxi_cost,
-- calculado pela aplicação. Persistir um valor derivado cria risco de ele
-- ficar desatualizado em relação às três parcelas.

CREATE TABLE IF NOT EXISTS trip_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    responsible_employee_id UUID NOT NULL REFERENCES employees(id),
    justification VARCHAR(500),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_trip_history_status CHECK (status IN ('RASCUNHO', 'SOLICITADA', 'CANCELADA', 'AJUSTES_SOLICITADOS', 'APROVADA', 'REJEITADA'))
);

-- ---------------------------------------------------------
-- Índices
-- ---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_employees_area ON employees(area_id);
CREATE INDEX IF NOT EXISTS idx_employees_cargo ON employees(cargo_id);
CREATE INDEX IF NOT EXISTS idx_employment_history_employee ON employment_history(employee_id, valid_from);

-- Garante, no próprio banco, que existe no máximo um período aberto
-- (valid_to IS NULL) por empregado -- sem isso, nada impede dois
-- registros "vigentes" simultâneos para o mesmo employee_id.
CREATE UNIQUE INDEX IF NOT EXISTS uq_employment_history_open_period
    ON employment_history(employee_id)
    WHERE valid_to IS NULL;

CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_employee ON trips(employee_id);
CREATE INDEX IF NOT EXISTS idx_trip_status_history_trip ON trip_status_history(trip_id, changed_at);

-- ---------------------------------------------------------
-- Seed: os únicos dois cargos que a especificação permite.
-- Áreas ficam de fora do seed de propósito -- o cadastro de
-- área é livre, a especificação não enumera valores fixos
-- para ela como faz com cargo.
-- ---------------------------------------------------------

INSERT INTO cargos (name, role) VALUES
    ('COLABORADOR', 'COLABORADOR'),
    ('GESTOR', 'GESTOR')
ON CONFLICT (name) DO NOTHING;