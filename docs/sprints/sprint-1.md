# Encerramento da Sprint 1

> **Marco Git:** `sprint-1`
> **Período:** 24/08/2026 a 31/08/2026
> **Tag criada em:** 07/09/2026

## Objetivo

Revisar os artefatos de planejamento, melhorar a apresentação do SGV e preparar a evolução do cadastro de viagens.

## Resultado verificável

Na linha histórica da `main`, foram integrados documentos de requisitos, User Stories, horas, burndown e melhorias visuais. A API continuou com o fluxo básico de viagens e a tela principal permaneceu com estado local.

Funcionalidades adicionais, incluindo cadastro de empregados, Flyway, testes e publicação de imagens, foram desenvolvidas no PR #2 durante a sprint, porém o PR permaneceu aberto no encerramento. Como essas alterações ainda não haviam sido integradas à main, elas não fazem parte da baseline oficial da Sprint 1.

## Artefatos

| Artefato | Localização |
|---|---|
| User Stories | `docs/User-Stories/sprint1_userStories.md` |
| Horas e burndown | `docs/Horas/` |
| Requisitos | `docs/requisitos.md` |
| Modelo de dados | `docs/MER/MER-SGV.md` |

## Limitação da tag histórica

A tag `sprint-1` foi criada depois do período da sprint e sua limitação histórica foi registrada no Jira. A rastreabilidade dos débitos de tags foi consolidada posteriormente na tarefa ES2-53 e na tag `techical-debt`.

## Recuperação

```bash
git fetch --tags
git switch --detach sprint-1
```
