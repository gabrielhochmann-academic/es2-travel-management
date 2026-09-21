CREATE TABLE IF NOT EXISTS areas (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY,
    registration_number VARCHAR(6) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    area_id UUID NOT NULL REFERENCES areas(id),
    employee_role VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_employee_registration CHECK (registration_number ~ '^[0-9]{4}-[0-9]$'),
    CONSTRAINT chk_employee_role CHECK (employee_role IN ('COLABORADOR', 'GESTOR'))
);

CREATE TABLE IF NOT EXISTS employment_history (
    id UUID PRIMARY KEY,
    employee_id UUID NOT NULL REFERENCES employees(id),
    area_id UUID NOT NULL REFERENCES areas(id),
    role VARCHAR(20) NOT NULL,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_to TIMESTAMPTZ,
    CONSTRAINT chk_history_role CHECK (role IN ('COLABORADOR', 'GESTOR')),
    CONSTRAINT chk_history_period CHECK (valid_to IS NULL OR valid_to >= valid_from)
);

CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY,
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
    employee_role VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL,
    decision_justification VARCHAR(500),
    transport_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    lodging_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    taxi_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_trip_period CHECK (return_date >= departure_date),
    CONSTRAINT chk_trip_status CHECK (status IN ('RASCUNHO', 'SOLICITADA', 'CANCELADA', 'AJUSTES_SOLICITADOS', 'APROVADA', 'REJEITADA')),
    CONSTRAINT chk_trip_costs CHECK (transport_cost >= 0 AND lodging_cost >= 0 AND taxi_cost >= 0)
);

CREATE TABLE IF NOT EXISTS trip_status_history (
    id UUID PRIMARY KEY,
    trip_id UUID NOT NULL REFERENCES trips(id),
    status VARCHAR(30) NOT NULL,
    responsible_employee_id UUID NOT NULL REFERENCES employees(id),
    justification VARCHAR(500),
    changed_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_trip_history_status CHECK (status IN ('RASCUNHO', 'SOLICITADA', 'CANCELADA', 'AJUSTES_SOLICITADOS', 'APROVADA', 'REJEITADA'))
);

CREATE INDEX IF NOT EXISTS idx_employees_area ON employees(area_id);
CREATE INDEX IF NOT EXISTS idx_employment_history_employee ON employment_history(employee_id, valid_from);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_employee ON trips(employee_id);
CREATE INDEX IF NOT EXISTS idx_trip_status_history_trip ON trip_status_history(trip_id, changed_at);
