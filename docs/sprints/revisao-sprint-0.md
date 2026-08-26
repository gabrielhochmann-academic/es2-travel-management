# Revisão da Sprint 0

| Item | Registro |
|---|---|
| Sprint | Sprint 0, Preparação |
| Período | 17/08/2026 a 24/08/2026 |
| Encerramento no Jira | 24/08/2026 |
| Marco Git | Tag anotada `sprint-0` |
| Situação no Jira | Sete issues concluídas no relatório histórico da sprint |

## Objetivo revisado

Preparar o ambiente de desenvolvimento e os artefatos iniciais do Sistema de Gestão de Viagens, incluindo repositório, quadro Jira, documentação de visão e caso de uso, exemplo de arquitetura e execução local em containers.

## Entregas verificadas

| Entrega | Evidência |
|---|---|
| Repositório e fluxo de trabalho | Repositório privado no GitHub, branches `main` e `develop`, e tag `sprint-0`. |
| Quadro do projeto | Quadro Jira do projeto ES2 e histórico da Sprint 0 com sete issues concluídas. |
| Documento de Visão | `docs/visao/Documento-de-Visao-SGV.docx`. |
| Casos de uso | `docs/casos-de-uso/UC01-Registrar-Viagem.md` e diagrama correspondente. |
| Arquitetura executável | Frontend React, backend Spring Boot, PostgreSQL e Docker Compose. |
| Validação local | Execução dos três serviços e acesso ao frontend registrados no encerramento da Sprint 0. |

## Resultado da revisão

O objetivo preparatório da Sprint 0 foi atendido. A aplicação disponibilizava uma interface demonstrativa, uma API executável e persistência PostgreSQL, mas a interface ainda utilizava estado local. Essa limitação foi registrada como evolução da Sprint 1, em que a integração com a API e o cadastro de empregados passaram a ser implementados.

## Pendências transferidas

| Item | Destino |
|---|---|
| Integração da interface React com API e banco | Sprint 1, planejamento de viagem. |
| Cadastro de empregados e vínculo com viagem | Sprint 1, planejamento de viagem. |
| Revisão de Kanban por sprint e rastreabilidade de artefatos | Sprint 1, gestão ágil. |

## Limites deste registro

Este registro consolida evidências técnicas e de gestão disponíveis. Horas individuais, dailys e comentários pessoais da equipe não foram incluídos porque dependem de dados fornecidos pelos integrantes.
