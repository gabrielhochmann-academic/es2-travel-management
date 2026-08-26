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

CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY,
    registration_number VARCHAR(40) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS trip_number_seq START WITH 1 INCREMENT BY 1;

ALTER TABLE trips
    ADD COLUMN IF NOT EXISTS trip_number VARCHAR(40),
    ADD COLUMN IF NOT EXISTS employee_id UUID,
    ADD COLUMN IF NOT EXISTS decision_justification VARCHAR(500);

ALTER TABLE trips
    ALTER COLUMN responsible_name DROP NOT NULL;

INSERT INTO employees (id, registration_number, name, area, created_at)
SELECT DISTINCT
    (
        substr(md5('legacy-employee-' || responsible_name), 1, 8) || '-' ||
        substr(md5('legacy-employee-' || responsible_name), 9, 4) || '-' ||
        substr(md5('legacy-employee-' || responsible_name), 13, 4) || '-' ||
        substr(md5('legacy-employee-' || responsible_name), 17, 4) || '-' ||
        substr(md5('legacy-employee-' || responsible_name), 21, 12)
    )::uuid,
    'LEGADO-' || upper(substr(md5('legacy-employee-' || responsible_name), 1, 10)),
    responsible_name,
    'Não informado',
    now()
FROM trips
WHERE responsible_name IS NOT NULL
ON CONFLICT (registration_number) DO NOTHING;

UPDATE trips
SET employee_id = employees.id
FROM employees
WHERE trips.employee_id IS NULL
  AND employees.registration_number = 'LEGADO-' || upper(substr(md5('legacy-employee-' || trips.responsible_name), 1, 10));

UPDATE trips
SET trip_number = 'VG-LEGADO-' || substr(id::text, 1, 8)
WHERE trip_number IS NULL;

ALTER TABLE trips
    ALTER COLUMN trip_number SET NOT NULL,
    ALTER COLUMN employee_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_trips_trip_number ON trips(trip_number);
CREATE INDEX IF NOT EXISTS idx_employees_name ON employees(name);
CREATE INDEX IF NOT EXISTS idx_trips_employee ON trips(employee_id);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_trips_employee') THEN
        ALTER TABLE trips ADD CONSTRAINT fk_trips_employee FOREIGN KEY (employee_id) REFERENCES employees(id);
    END IF;
END $$;

ALTER TABLE trips DROP COLUMN IF EXISTS responsible_name;
