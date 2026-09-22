# MER | Sistema de Gestão de Viagens

## Modelo atual

```mermaid
erDiagram
    AREA ||--o{ EMPLOYEE : organiza
    CARGO ||--o{ EMPLOYEE : classifica
    EMPLOYEE ||--o{ EMPLOYMENT_HISTORY : possui
    AREA ||--o{ EMPLOYMENT_HISTORY : registra
    CARGO ||--o{ EMPLOYMENT_HISTORY : registra
    EMPLOYEE ||--o{ TRIP : solicita
    TRIP ||--o{ TRIP_STATUS_HISTORY : possui
    EMPLOYEE ||--o{ TRIP_STATUS_HISTORY : registra
    TRIP ||--o{ TRIP_COST_HISTORY : possui
    EMPLOYEE ||--o{ TRIP_COST_HISTORY : registra

    AREA {
        uuid id PK
        varchar name UK
        timestamptz created_at
    }

    CARGO {
        uuid id PK
        varchar name UK
        varchar role
    }

    EMPLOYEE {
        uuid id PK
        varchar registration_number UK
        varchar name
        uuid area_id FK
        uuid cargo_id FK
        timestamptz created_at
    }

    EMPLOYMENT_HISTORY {
        uuid id PK
        uuid employee_id FK
        uuid area_id FK
        uuid cargo_id FK
        timestamptz valid_from
        timestamptz valid_to
    }

    TRIP {
        uuid id PK
        varchar trip_number UK
        varchar destination
        date departure_date
        date return_date
        varchar reason
        varchar transport_mode
        uuid employee_id FK
        varchar employee_name
        varchar employee_registration_number
        varchar employee_area
        varchar employee_cargo
        varchar employee_role
        varchar status
        decimal transport_cost
        decimal lodging_cost
        decimal taxi_cost
        varchar decision_justification
        timestamptz created_at
    }

    TRIP_STATUS_HISTORY {
        uuid id PK
        uuid trip_id FK
        varchar status
        uuid responsible_employee_id FK
        varchar justification
        timestamptz changed_at
    }

    TRIP_COST_HISTORY {
        uuid id PK
        uuid trip_id FK
        uuid responsible_employee_id FK
        decimal transport_cost
        decimal lodging_cost
        decimal taxi_cost
        timestamptz changed_at
    }
```

## Regras de integridade

| Elemento | Regra aplicada |
|---|---|
| `cargos.role` | Aceita somente `COLABORADOR` ou `GESTOR`. |
| `employees.registration_number` | Matrícula única e obrigatória no formato `XXXX-X`. |
| `employment_history` | Mantém cargo e área ao longo do tempo, com no máximo um período aberto por empregado. |
| `trips.trip_number` | Número único obtido pela sequence PostgreSQL `trip_number_seq`. |
| `trips.employee_id` | Chave estrangeira obrigatória para o empregado solicitante. |
| Campos `employee_*` de `trips` | Snapshot do empregado no momento da solicitação. |
| Datas da viagem | `return_date` deve ser igual ou posterior a `departure_date`. |
| Custos | Valores não negativos; custo total é calculado pela aplicação. |
| `trip_status_history` | Registra cada mudança de situação e o empregado responsável. |
| `trip_cost_history` | Registra cada alteração de custo e o empregado responsável. |

## Numeração

A sequência `trip_number_seq` é incrementada diretamente pelo PostgreSQL. Isso evita que duas criações simultâneas obtenham o mesmo número, diferentemente do cálculo `MAX + 1` na aplicação.

## Relações principais

Uma área e um cargo podem estar associados a vários empregados. Cada empregado possui um histórico de alocações e pode solicitar várias viagens. Cada viagem mantém o snapshot do empregado, registra alterações de situação e mantém uma trilha específica para alterações financeiras.
