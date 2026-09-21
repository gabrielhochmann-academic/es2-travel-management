-- Estrutura da tabela de viagens corporativas do SGV.
-- Executada na inicialização de uma base PostgreSQL nova.
-- Observação: o esquema também é mantido pelo Hibernate (ddl-auto=update).
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    reason VARCHAR(500) NOT NULL,
    transport_mode VARCHAR(255) NOT NULL,
    responsible_name VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL,
    -- Funcionalidade CUSTOS: três categorias; o custo total é sempre calculado (nunca armazenado).
    transport_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    lodging_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    taxi_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_trip_period CHECK (return_date >= departure_date)
);

CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_destination ON trips(destination);

-- Migração para bancos já existentes (volume Docker antigo):
--   ALTER TABLE trips
--     ADD COLUMN IF NOT EXISTS transport_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
--     ADD COLUMN IF NOT EXISTS lodging_cost   NUMERIC(12,2) NOT NULL DEFAULT 0,
--     ADD COLUMN IF NOT EXISTS taxi_cost      NUMERIC(12,2) NOT NULL DEFAULT 0,
--     DROP COLUMN IF EXISTS estimated_cost;
