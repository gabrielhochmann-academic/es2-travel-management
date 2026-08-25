-- Estrutura da tabela de viagens corporativas do SGV.
-- Executada na inicialização de uma base PostgreSQL nova.
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    reason VARCHAR(500) NOT NULL,
    transport_mode VARCHAR(255) NOT NULL,
    responsible_name VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL,
    estimated_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_trip_period CHECK (return_date >= departure_date)
);

CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_destination ON trips(destination);
