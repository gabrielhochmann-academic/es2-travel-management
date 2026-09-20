# Encerramento da Sprint 3

> **Marco Git:** `sprint-3`
> **Período:** 07/09 - 14/09
> **Data de encerramento:** 14/09

## Objetivo do marco

Este documento registra a baseline de encerramento da Sprint 3 do Sistema de Gestão de Viagens (SGV). A tag anotada `sprint-3` identifica o commit que representa o estado dos artefatos ao fim da sprint.

Durante esta sprint, foi desenvolvido o controle de custos das viagens, permitindo informar e armazenar o custo associado a cada viagem. Também foi criado um painel de custos para facilitar a visualização e o acompanhamento dos valores das viagens cadastradas no sistema.

## Artefatos consolidados

| **Artefato** | **Localização no repositório** | **Situação no encerramento** |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Interface do sistema | `frontend/` | Interface aprimorada com a inclusão das informações de custo das viagens e do painel de custos. |
| API do sistema | `backend/` | API atualizada para suportar o cadastro e a consulta dos custos associados às viagens. |
| Persistência | `database/` | Banco de dados atualizado para armazenar os custos relacionados às viagens. |
| Ambiente integrado | `docker-compose.yml` e Dockerfiles | Ambiente integrado mantido e atualizado conforme as alterações realizadas no sistema. |
| Documentação | `docs/` | Documentação revisada conforme as novas funcionalidades relacionadas ao controle de custos. |
| Painel de custos | `frontend/` | Painel criado para acompanhar e visualizar os custos das viagens cadastradas. |
| Controle de custos | `backend/` | Implementada a funcionalidade para registrar e consultar o custo de uma viagem. |

## Funcionalidades implementadas

Durante a Sprint 3, foi desenvolvido o **editar custos das viagens** no SGV.

Foi implementada a possibilidade de **informar o custo de uma viagem**, permitindo que uma viagem cadastrada possua um valor associado às suas informações.

Além disso, foi desenvolvido um **painel de custos**, permitindo visualizar de forma centralizada os valores associados às viagens cadastradas no sistema, com a funcionalidade adicional de verificar a média de custos de viagens.

## Melhorias realizadas

### Painel de custos

Foi criado o **Painel de Custos**, permitindo visualizar e acompanhar os valores registrados nas viagens de forma mais organizada.

### Registro de custos

As viagens passaram a permitir o **registro de custos**, possibilitando associar um valor específico a cada viagem cadastrada no sistema.

### Integração das informações

As informações de custo foram integradas ao fluxo existente das viagens, permitindo que o valor seja armazenado e consultado juntamente com os demais dados da viagem.

### Banco de dados

Foi realizada uma atualização na estrutura do banco de dados para permitir o armazenamento das informações relacionadas aos custos das viagens.

## Limitações e pontos de melhoria conhecidos

Ao final da Sprint 3, o sistema passou a contar com o registro de custos nas viagens e com um painel específico para acompanhamento dessas informações.

Apesar dos avanços realizados, ainda podem ser necessários novos ajustes no painel para aprimorar a apresentação dos dados e facilitar a visualização das informações de custos.

Também permanecem como pontos de melhoria a evolução das funcionalidades relacionadas ao controle financeiro das viagens e o refinamento das informações apresentadas no painel, conforme novas necessidades sejam identificadas durante as próximas sprints.

## Recuperação futura

Para recuperar os artefatos versionados deste marco, utilize:

```bash
git fetch --tags
git switch --detach sprint-3
