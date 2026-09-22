# Encerramento da Sprint 4

> **Marco Git:** `sprint-4`
> **Período:** 14/09/2026 a 21/09/2026
> **Data de encerramento:** 21/09/2026

## Objetivo

Consolidar a versão final do SGV com custos de viagem, dashboard de indicadores, correção dos débitos técnicos e documentação final.

## Objetivos atendidos

| Objetivo | Atendimento |
|---|---|
| Calcular custos de deslocamento, hospedagem, táxi e total | Implementado e persistido pela API |
| Desenvolver dashboard com pelo menos três indicadores | Implementado com quantidades, totais, média, categorias e maior custo |
| Corrigir os débitos técnicos | Cinco tarefas ES2-50 a ES2-54 registradas e concluídas no Jira |
| Atualizar documentos técnicos e de planejamento | Documentos revisados na `main` |
| Consolidar reviews e retrospectivas | `docs/sprints/revisoes-e-retrospectivas.md` |

## Funcionalidades integradas

| Funcionalidade | Evidência |
|---|---|
| Áreas e empregados | `GET/POST /api/areas` e `GET/POST /api/employees` |
| Cargo e área com histórico | `PUT /api/employees/{id}/assignment` e `GET /api/employees/{id}/history` |
| Planejamento da viagem | `GET/POST/PUT /api/trips` |
| Fluxo de aprovação | Submissão, cancelamento, aprovação, rejeição e ajustes |
| Histórico da viagem | Situação, responsável, justificativa e data |
| Custos | Deslocamento, hospedagem, táxi e total calculado |
| Indicadores | Quantidades, total, média, categorias e maior custo |
| Interface integrada | Viagens, empregados e custos consumindo a API |
| Débitos técnicos | Registro consolidado em `docs/sprints/debitos-tecnicos.md` |

## Validação

```bash
mvn --file backend/pom.xml test
npm --prefix frontend run build
docker compose config
```

Também foram validados os fluxos de cadastro, alteração de cargo e área, criação, cancelamento, ajustes, ressubmissão, aprovação, custos e históricos com PostgreSQL.

## Revisões e retrospectivas

O histórico consolidado está em `docs/sprints/revisoes-e-retrospectivas.md`.

## Recuperação

A tag `sprint-4` identifica a versão final da sprint. A tag `techical-debt` preserva a grafia solicitada no enunciado da disciplina e marca o estado consolidado dos débitos técnicos.
