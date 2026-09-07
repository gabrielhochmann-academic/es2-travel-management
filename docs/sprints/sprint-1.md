# Encerramento da Sprint 1

> **Marco Git:** `sprint-1`
> **Período:** 24 de agosto de 2026 a 31 de agosto de 2026
> **Data de encerramento:** 31 de agosto de 2026

## Objetivo do marco

Este documento registra a baseline de encerramento da Sprint 1 do Sistema de Gestão de Viagens (SGV). A tag anotada `sprint-1` identifica o commit que representa o estado dos artefatos ao fim da sprint.

Durante esta sprint, os artefatos existentes foram revisados, aprimorados e ajustados, buscando maior consistência entre a documentação e o desenvolvimento do sistema.

## Artefatos consolidados

| **Artefato**         | **Localização no repositório**     | **Situação no encerramento**                                                                                           |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Interface do sistema | `frontend/`                        | Interface existente aprimorada, com necessidade de novos ajustes relacionados ao design e à experiência de utilização. |
| API do sistema       | `backend/`                         | API existente revisada e aprimorada conforme as necessidades do sistema.                                               |
| Persistência         | `database/`                        | Estrutura existente mantida, com necessidade de adicionar e aprimorar a modelagem do banco de dados.                   |
| Ambiente integrado   | `docker-compose.yml` e Dockerfiles | Ambiente existente mantido e aprimorado durante a sprint.                                                              |
| Documentação         | `docs/`                            | Documentação existente revisada e aprimorada conforme a evolução do projeto.                                           |

## Limitações e pontos de melhoria conhecidos

Ao final da Sprint 1, os principais artefatos do projeto passaram por melhorias e ajustes. Entretanto, ainda existem pontos que deverão ser trabalhados nas próximas sprints.

A interface do sistema necessita de novos aprimoramentos de design, principalmente para melhorar sua organização visual, consistência e experiência de utilização.

Também permanece como uma atividade pendente a **adição e o aprimoramento da modelagem do banco de dados**, de forma que sua estrutura represente adequadamente as entidades, relacionamentos e informações necessárias ao Sistema de Gestão de Viagens.

Além dos aspectos técnicos, foram identificadas dificuldades na realização das reuniões diárias (dailies). A conciliação de horários e a organização da comunicação entre os integrantes representaram desafios para a equipe. Como melhoria para as próximas sprints, será necessário estabelecer uma organização mais eficiente das reuniões, buscando maior objetividade e melhor acompanhamento das atividades.

## Recuperação futura

Para recuperar os artefatos versionados deste marco, utilize:

```bash
git fetch --tags
git switch --detach sprint-1
```

Para reaproveitar somente um componente desta sprint na versão atual, restaure o diretório desejado a partir da tag. Por exemplo:

```bash
git restore --source=sprint-1 -- frontend/
```

## Convenção de tags

As tags de encerramento seguirão o padrão `sprint-<número>`, em letras minúsculas e sem espaços. Exemplos: `sprint-0`, `sprint-1`, `sprint-2` e `sprint-3`.

Cada tag deverá ser anotada, apontar para um commit já integrado à branch `main` e possuir um backup lógico do PostgreSQL correspondente quando houver dados relevantes a preservar.
