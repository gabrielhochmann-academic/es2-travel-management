# Encerramento da Sprint 0

> **Marco Git:** `sprint-0`  
> **Data de encerramento:** 24 de agosto de 2026

## Objetivo do marco

Este documento registra a baseline de encerramento da Sprint 0 do Sistema de Gestão de Viagens (SGV). A tag anotada `sprint-0` identifica o commit que representa o estado integrado e validado dos artefatos ao fim da sprint.

## Artefatos consolidados

| Artefato | Localização no repositório | Situação no encerramento |
|---|---|---|
| Interface do sistema | `frontend/` | Demonstrador visual em React, com estado local. |
| API do sistema | `backend/` | API Spring Boot executável, com rotas para criar, listar, submeter e decidir viagens. |
| Persistência | `database/` | Script inicial do PostgreSQL versionado. |
| Ambiente integrado | `docker-compose.yml` e Dockerfiles | Serviços validados por Docker Compose. |
| Documentação | `docs/` | Requisitos, visão, caso de uso, diagramas e documentação de arquitetura. |

## Limitação conhecida

A interface React ainda não consome os endpoints da API. As ações realizadas pelo demonstrador são mantidas apenas no estado local da aplicação e não persistem no PostgreSQL. A integração frontend–API será tratada como evolução das próximas sprints.

## Recuperação futura

Para recuperar os artefatos versionados deste marco, utilize:

```bash
git fetch --tags
git switch --detach sprint-0
```

Para reaproveitar somente um componente desta sprint na versão atual, restaure o diretório desejado a partir da tag. Por exemplo:

```bash
git restore --source=sprint-0 -- frontend/
```

## Convenção de tags

As tags de encerramento seguirão o padrão `sprint-<número>`, em letras minúsculas e sem espaços. Exemplos: `sprint-0`, `sprint-1`, `sprint-2` e `sprint-3`.

Cada tag deverá ser anotada, apontar para um commit já integrado à branch `main` e possuir um backup lógico do PostgreSQL correspondente quando houver dados relevantes a preservar.
