# Arquitetura do SGV

> **Princípio de solução:** separar a experiência do usuário, as regras de negócio e a persistência de dados para permitir evolução organizada do Sistema de Gestão de Viagens.

## Visão da solução

O exemplo técnico do SGV é composto por três serviços integrados e executados pelo Docker Compose: uma interface web, uma API de negócio e um banco de dados. Essa separação torna responsabilidades mais claras e facilita a evolução de cada camada ao longo das sprints.

![Diagrama de arquitetura](arquitetura-exemplo.png)

---

## Componentes e responsabilidades

| Componente | Tecnologia | Responsabilidade no produto | Acesso local |
|---|---|---|---|
| **Interface web** | React, TypeScript, Vite e Nginx | Apresentar a experiência de registro e acompanhamento de viagens. | `http://localhost:5173` |
| **API de negócio** | Spring Boot e Java 21 | Aplicar as regras do fluxo de viagens e disponibilizar endpoints REST. | `http://localhost:8080` |
| **Banco de dados** | PostgreSQL 16 | Persistir viagens, situações e informações associadas. | `localhost:5432` |
| **Orquestração** | Docker Compose | Construir e executar os serviços de forma integrada e reproduzível. | — |

---

## Caminho da informação

```text
Usuário
   ↓
Interface React
   ↓  (API REST /api)
Backend Spring Boot
   ↓
PostgreSQL
```

> **Estado atual da Sprint 0:** frontend, backend e banco foram validados como componentes executáveis. A interface React ainda utiliza estado local e não consome os endpoints da API; essa integração é uma evolução prevista para as próximas sprints.

---

## Persistência e recuperação

O PostgreSQL utiliza o volume nomeado `postgres_data`, preservando os dados entre reinicializações dos containers. A estrutura inicial da entidade de viagens está descrita em [`database/trips.sql`](../../database/trips.sql).

| Necessidade | Mecanismo adotado |
|---|---|
| Reproduzir o ambiente local | `docker compose up --build` |
| Preservar dados entre reinicializações | Volume nomeado `postgres_data` |
| Versionar a estrutura de dados | Script SQL no repositório Git |
| Recuperar uma baseline de sprint | Tag Git `sprint-<número>` e backup lógico correspondente, quando necessário |
