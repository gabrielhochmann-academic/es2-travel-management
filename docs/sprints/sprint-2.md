# Encerramento da Sprint 2

> **Marco Git:** `sprint-2`
> **Período:** 31/08/2026 a 07/09/2026
> **Data de encerramento:** 07/09/2026

## Objetivo

Implementar o fluxo inicial de aprovação de viagens e atualizar os artefatos do SGV.

## Resultado integrado

Na linha histórica da `main`, a API passou a permitir submissão, aprovação e rejeição. A interface permaneceu demonstrativa e não passou a persistir o fluxo principal. O cadastro de empregados, cargos e áreas, o cancelamento, a solicitação de ajustes e os históricos exigidos pelo Product Owner não foram integrados.

| Requisito | Situação no encerramento |
|---|---|
| Criar viagem como Rascunho | Implementado na API |
| Submeter viagem | Implementado na API |
| Aprovar ou rejeitar viagem | Implementado na API |
| Exigir justificativa na rejeição | Implementado na API |
| Cancelar viagem | Pendente |
| Solicitar ajustes e ressubmeter | Pendente |
| Restringir decisões a gestores | Pendente |
| Histórico de situações | Pendente |
| Cadastro de empregado, cargo e área | Pendente |
| Histórico de cargo e área | Pendente |

## Artefatos

| Artefato | Localização |
|---|---|
| User Stories | `docs/User-Stories/sprint2_userStories.md` |
| Caso de uso de aprovação | `docs/casos-de-uso/UC02 - Aprovação Viagem.md` |
| MER | `docs/MER/MER-SGV.md` |
| Horas e burndown | `docs/Horas/` |

## Limitação da tag histórica

A tag `sprint-2` existente aponta para o commit `4d96156`, anterior aos artefatos e às alterações atribuídas à Sprint 2. Ela não constitui uma baseline confiável da entrega. A tag foi preservada para não reescrever o histórico sem decisão explícita da equipe. A correção dessa referência está registrada como débito técnico.
