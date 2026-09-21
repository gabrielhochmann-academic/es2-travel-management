# Arquitetura do SGV

> **Princípio de solução:** separar interface, regras de negócio e persistência para manter o Sistema de Gestão de Viagens organizado.

## Visão da solução

O SGV possui três serviços executados pelo Docker Compose: interface web, API de negócio e banco de dados.

![Diagrama de arquitetura](arquitetura-exemplo.png)

## Componentes

| Componente | Tecnologia | Responsabilidade | Acesso local |
|---|---|---|---|
| **Interface web** | React, TypeScript, Vite e Nginx | Viagens, empregados, aprovações, custos e indicadores | `http://localhost:5173` |
| **API** | Spring Boot e Java 21 | Regras de negócio e endpoints REST | `http://localhost:8080` |
| **Banco de dados** | PostgreSQL 16 | Viagens, empregados, áreas e históricos | `localhost:5432` |
| **Orquestração** | Docker Compose | Construção e execução integrada | - |

## Caminho da informação

```text
Usuário
   ↓
Interface React
   ↓  /api
Backend Spring Boot
   ↓
PostgreSQL
```

A interface consome a API para todas as operações. As mudanças feitas nas telas são persistidas no PostgreSQL.

## Domínios persistidos

| Domínio | Dados principais |
|---|---|
| Área | Nome |
| Empregado | Matrícula, nome, cargo e área atual |
| Histórico funcional | Cargo, área, início e fim da vigência |
| Viagem | Número, planejamento, empregado, situação e custos |
| Histórico da viagem | Situação, responsável, justificativa e data |

## Persistência e recuperação

O volume `postgres_data` preserva os dados entre reinicializações. A estrutura inicial está em [`database/trips.sql`](../../database/trips.sql).

| Necessidade | Mecanismo |
|---|---|
| Executar o ambiente | `docker compose up --build` |
| Preservar dados | Volume `postgres_data` |
| Recriar a base local | `docker compose down -v` |
| Versionar a estrutura | Script SQL no repositório |
| Recuperar uma sprint | Tag `sprint-<número>` |
