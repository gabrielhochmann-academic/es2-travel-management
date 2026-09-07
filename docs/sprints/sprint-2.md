# Encerramento da Sprint 2

> **Marco Git:** `sprint-2`
> **Período:** 31/08 - 07/09
> **Data de encerramento:** 07/09

## Objetivo do marco

Este documento registra a baseline de encerramento da Sprint 2 do Sistema de Gestão de Viagens (SGV). A tag anotada `sprint-2` identifica o commit que representa o estado dos artefatos ao fim da sprint.

Durante esta sprint, foi feito aprimoramento na interface, na documentação e na estrutura do banco de dados, além da implementação de funcionalidades relacionadas ao fluxo de aprovação de viagens. Também foi criado o Burndown Chart para acompanhar o andamento das atividades e a utilização das horas durante a sprint.

## Artefatos consolidados

| **Artefato** | **Localização no repositório** | **Situação no encerramento** |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Interface do sistema | `frontend/` | Interface aprimorada, com melhorias no design, organização visual e experiência de utilização. |
| API do sistema | `backend/` | API aprimorada com a implementação das funcionalidades relacionadas ao fluxo de aprovação de viagens. |
| Persistência | `database/` | Banco de dados aprimorado, com ajustes na estrutura e na modelagem para suportar as funcionalidades implementadas. |
| Ambiente integrado | `docker-compose.yml` e Dockerfiles | Ambiente integrado mantido e atualizado conforme as alterações realizadas no sistema. |
| Documentação | `docs/` | Documentação revisada, padronizada e reorganizada, buscando centralizar os artefatos e facilitar sua consulta. |
| Burndown Chart | `docs/Horas/` | Burndown Chart criado para acompanhar o progresso da sprint e a evolução das horas da equipe. |
| Fluxo de aprovação | `backend/` | Implementadas as funcionalidades para submeter uma viagem para aprovação, consultar seu histórico de situação e aprovar ou rejeitar uma viagem. |

## Funcionalidades implementadas

Durante a Sprint 2, foi desenvolvido funcionalidades relacionadas ao processo de aprovação das viagens no SGV.

Foi implementado o **envio de uma viagem para aprovação**, permitindo que uma viagem cadastrada seja submetida ao fluxo de análise após o preenchimento das informações necessárias.

Também foi implementada a funcionalidade de **consulta do histórico da situação da viagem**, permitindo acompanhar as alterações de status ocorridas durante o processo e proporcionando maior rastreabilidade das ações realizadas.

Logo, foi desenvolvido o fluxo para **aprovar ou rejeitar uma viagem**, permitindo que o responsável pela análise registre sua decisão sobre uma solicitação de viagem.

## Melhorias realizadas

### Design da interface

Foram realizados upgrades no design do website, buscando melhorar a organização visual das telas, a consistência dos elementos da interface e a experiência de utilização do sistema.

### Acompanhamento da sprint

Foi criado o **Burndown Chart**, localizado em `docs/Horas/`, com o objetivo de acompanhar visualmente o progresso das atividades e a evolução das horas utilizadas pela equipe ao longo da sprint.

### Padronização da documentação

Os documentos do projeto foram revisados e reorganizados, buscando estabelecer um padrão de apresentação e facilitar a localização dos diferentes artefatos. O README também foi ajustado para melhorar a organização das informações e centralizar os principais conteúdos do projeto.

### Banco de dados

Foi realizado um upgrade no banco de dados, corrigindo problemas existentes e aprimorando sua estrutura para permitir o funcionamento adequado das novas funcionalidades implementadas durante a sprint.

## Limitações e pontos de melhoria conhecidos

Ao final da Sprint 2, as principais funcionalidades relacionadas ao fluxo de aprovação de viagens foram implementadas, juntamente com melhorias na interface, documentação e banco de dados.

Apesar dos avanços realizados, ainda podem ser necessários novos ajustes na interface para aprimorar a experiência de utilização e garantir maior consistência visual entre as diferentes telas do sistema.

Também permanecem como pontos de melhoria a evolução da modelagem do banco de dados e o refinamento das funcionalidades já implementadas, conforme novas necessidades sejam identificadas durante as próximas sprints.

## Recuperação futura

Para recuperar os artefatos versionados deste marco, utilize:

```bash
git fetch --tags
git switch --detach sprint-2