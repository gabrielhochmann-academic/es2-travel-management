# Encerramento da Sprint 1

> **Marco Git:** `sprint-1`
> **Período:** 24/08/2026 a 31/08/2026
> **Tag criada em:** 07/09/2026

## Objetivo

Revisar os artefatos de planejamento, melhorar a apresentação do SGV e preparar a evolução do cadastro de viagens.

## Resultado verificável

Na linha histórica da `main`, foram integrados documentos de requisitos, User Stories, horas, burndown e melhorias visuais. A API continuou com o fluxo básico de viagens e a tela principal permaneceu com estado local.

Um desenvolvimento mais amplo, com cadastro de empregados, Flyway, testes e publicação de imagens, permaneceu no PR #2 e não foi integrado à `main`. Por isso, esses itens não são declarados como parte da baseline da Sprint 1.

## Artefatos

| Artefato | Localização |
|---|---|
| User Stories | `docs/User-Stories/sprint1_userStories.md` |
| Horas e burndown | `docs/Horas/` |
| Requisitos | `docs/requisitos.md` |
| Modelo de dados | `docs/MER/MER-SGV.md` |

## Limitação da tag histórica

A tag `sprint-1` é leve e foi criada depois do período da sprint. Ela aponta para um commit da `main`, mas não segue a convenção atual de tag anotada. A referência foi preservada para não reescrever o histórico e sua regularização está registrada como débito técnico.

## Recuperação

```bash
git fetch --tags
git switch --detach sprint-1
```
