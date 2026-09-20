# Encerramento da Sprint 4

> **Marco Git:** `sprint-4`
> **Período:** 14/09 - 21/09
> **Data de encerramento:** 21/09

## Objetivo do marco

Este documento registra a baseline de encerramento da Sprint 4 do Sistema de Gestão de Viagens (SGV). A tag anotada `sprint-4` identifica o commit que representa o estado final dos artefatos ao fim da sprint.

Durante esta sprint, foram realizadas as atividades finais de desenvolvimento do projeto, com foco na conclusão das funcionalidades previstas, correção de erros identificados durante os testes, organização e revisão do código e finalização da documentação do sistema.

A sprint também foi dedicada à validação geral dos componentes desenvolvidos ao longo das sprints anteriores, buscando garantir a integração adequada entre interface, API e banco de dados e preparar o sistema para sua entrega final.

## Artefatos consolidados

| **Artefato** | **Localização no repositório** | **Situação no encerramento** |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Interface do sistema | `frontend/` | Interface finalizada, revisada e ajustada para corrigir inconsistências identificadas durante a validação do sistema. |
| API do sistema | `backend/` | API consolidada com as funcionalidades desenvolvidas durante as sprints e correções realizadas na etapa final. |
| Persistência | `database/` | Banco de dados revisado e integrado às funcionalidades finais do sistema. |
| Ambiente integrado | `docker-compose.yml` e Dockerfiles | Ambiente de execução revisado e mantido funcional para utilização do sistema completo. |
| Documentação | `docs/` | Documentação finalizada e revisada com as informações referentes ao desenvolvimento e funcionamento do sistema. |
| Testes e validações | `frontend/`, `backend/` e ambiente integrado | Funcionalidades verificadas e problemas identificados durante a etapa final corrigidos. |
| Código-fonte | `frontend/` e `backend/` | Código revisado, organizado e consolidado para a versão final do sistema. |

## Funcionalidades implementadas

Durante a Sprint 4, foram concluídas as funcionalidades previstas para o Sistema de Gestão de Viagens, com foco na integração e estabilização dos recursos desenvolvidos ao longo das sprints anteriores.


## Melhorias realizadas

### Finalização do sistema

Foi realizada a conclusão das funcionalidades desenvolvidas ao longo das sprints, consolidando os recursos necessários para a versão final do SGV.

### Correção de bugs

Foram identificados e corrigidos erros encontrados durante a utilização e validação do sistema, incluindo problemas relacionados ao funcionamento das funcionalidades e à integração entre os componentes.

### Revisão e organização do código

O código-fonte foi revisado e organizado, buscando melhorar sua consistência e facilitar a manutenção dos componentes desenvolvidos.


### Finalização da documentação

A documentação do projeto foi revisada e finalizada, consolidando as informações necessárias sobre o sistema, suas funcionalidades e os artefatos desenvolvidos durante as sprints.

## Recuperação futura

Para recuperar os artefatos versionados deste marco, utilize:

```bash
git fetch --tags
git switch --detach sprint-4
