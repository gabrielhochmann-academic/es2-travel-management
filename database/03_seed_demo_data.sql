-- Dados mínimos para demonstração local do SGV.
-- Este arquivo é executado pelo PostgreSQL somente na criação de um volume novo.

INSERT INTO areas (id, name)
VALUES
    ('10000000-0000-0000-0000-000000000001', 'Tecnologia'),
    ('10000000-0000-0000-0000-000000000002', 'Financeiro')
ON CONFLICT (id) DO NOTHING;

INSERT INTO employees (id, registration_number, name, area_id, cargo_id)
SELECT '20000000-0000-0000-0000-000000000001', '1001-1', 'Ana Martins',
       a.id, c.id
FROM areas a
CROSS JOIN cargos c
WHERE a.name = 'Tecnologia' AND c.name = 'Analista de Sistema'
ON CONFLICT (id) DO NOTHING;

INSERT INTO employees (id, registration_number, name, area_id, cargo_id)
SELECT '20000000-0000-0000-0000-000000000002', '1002-2', 'Bruno Almeida',
       a.id, c.id
FROM areas a
CROSS JOIN cargos c
WHERE a.name = 'Financeiro' AND c.name = 'Gestor de Projetos'
ON CONFLICT (id) DO NOTHING;

INSERT INTO employees (id, registration_number, name, area_id, cargo_id)
SELECT '20000000-0000-0000-0000-000000000003', '1003-3', 'Carla Souza',
       a.id, c.id
FROM areas a
CROSS JOIN cargos c
WHERE a.name = 'Tecnologia' AND c.name = 'Estagiária de Desenvolvimento de Software'
ON CONFLICT (id) DO NOTHING;

INSERT INTO employment_history (id, employee_id, area_id, cargo_id)
SELECT '30000000-0000-0000-0000-000000000001', e.id, e.area_id, e.cargo_id
FROM employees e
WHERE e.id = '20000000-0000-0000-0000-000000000001'
ON CONFLICT (id) DO NOTHING;

INSERT INTO employment_history (id, employee_id, area_id, cargo_id)
SELECT '30000000-0000-0000-0000-000000000002', e.id, e.area_id, e.cargo_id
FROM employees e
WHERE e.id = '20000000-0000-0000-0000-000000000002'
ON CONFLICT (id) DO NOTHING;

INSERT INTO employment_history (id, employee_id, area_id, cargo_id)
SELECT '30000000-0000-0000-0000-000000000003', e.id, e.area_id, e.cargo_id
FROM employees e
WHERE e.id = '20000000-0000-0000-0000-000000000003'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trips (
    id, trip_number, destination, departure_date, return_date, reason, transport_mode,
    employee_id, employee_name, employee_registration_number, employee_area, employee_cargo,
    employee_role, status, decision_justification, transport_cost, lodging_cost, taxi_cost
)
SELECT
    '40000000-0000-0000-0000-000000000001', 'VG-00001', 'Cascavel', DATE '2026-10-05', DATE '2026-10-06',
    'Reunião de planejamento do projeto', 'Terrestre', e.id, e.name, e.registration_number, a.name, c.name,
    c.role, 'RASCUNHO', NULL, 0, 0, 0
FROM employees e
JOIN areas a ON a.id = e.area_id
JOIN cargos c ON c.id = e.cargo_id
WHERE e.id = '20000000-0000-0000-0000-000000000001'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trips (
    id, trip_number, destination, departure_date, return_date, reason, transport_mode,
    employee_id, employee_name, employee_registration_number, employee_area, employee_cargo,
    employee_role, status, decision_justification, transport_cost, lodging_cost, taxi_cost
)
SELECT
    '40000000-0000-0000-0000-000000000002', 'VG-00002', 'Foz do Iguaçu', DATE '2026-10-12', DATE '2026-10-14',
    'Apresentação acadêmica', 'Aéreo', e.id, e.name, e.registration_number, a.name, c.name,
    c.role, 'APROVADA', NULL, 850.00, 620.00, 120.00
FROM employees e
JOIN areas a ON a.id = e.area_id
JOIN cargos c ON c.id = e.cargo_id
WHERE e.id = '20000000-0000-0000-0000-000000000001'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trip_status_history (id, trip_id, status, responsible_employee_id, justification)
SELECT '50000000-0000-0000-0000-000000000001', t.id, 'RASCUNHO', t.employee_id, 'Viagem criada'
FROM trips t
WHERE t.id = '40000000-0000-0000-0000-000000000001'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trip_status_history (id, trip_id, status, responsible_employee_id, justification)
SELECT '50000000-0000-0000-0000-000000000002', t.id, 'RASCUNHO', t.employee_id, 'Viagem criada'
FROM trips t
WHERE t.id = '40000000-0000-0000-0000-000000000002'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trip_status_history (id, trip_id, status, responsible_employee_id, justification)
SELECT '50000000-0000-0000-0000-000000000003', t.id, 'SOLICITADA', t.employee_id, 'Viagem submetida para análise'
FROM trips t
WHERE t.id = '40000000-0000-0000-0000-000000000002'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trip_status_history (id, trip_id, status, responsible_employee_id, justification)
SELECT '50000000-0000-0000-0000-000000000004', t.id, 'APROVADA', e.id, 'Aprovada para execução'
FROM trips t
JOIN employees e ON e.registration_number = '1002-2'
WHERE t.id = '40000000-0000-0000-0000-000000000002'
ON CONFLICT (id) DO NOTHING;

INSERT INTO trip_cost_history (id, trip_id, responsible_employee_id, transport_cost, lodging_cost, taxi_cost)
SELECT '60000000-0000-0000-0000-000000000001', t.id, e.id, 850.00, 620.00, 120.00
FROM trips t
JOIN employees e ON e.registration_number = '1002-2'
WHERE t.id = '40000000-0000-0000-0000-000000000002'
ON CONFLICT (id) DO NOTHING;

SELECT setval(
    'trip_number_seq',
    GREATEST(COALESCE(MAX(CAST(SUBSTRING(trip_number, 4) AS BIGINT)), 1), 1),
    COALESCE(MAX(CAST(SUBSTRING(trip_number, 4) AS BIGINT)), 0) > 0
)
FROM trips;
