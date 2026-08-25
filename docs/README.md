# Central de Artefatos do SGV

> **Sistema de Gestão de Viagens (SGV)**
>
> Esta central organiza os artefatos que sustentam a visão de produto, as regras de negócio, a experiência do usuário e as decisões técnicas do projeto.

## Visão rápida

O SGV foi concebido para centralizar o planejamento, a solicitação e o acompanhamento de viagens corporativas. Os documentos abaixo formam uma leitura progressiva: iniciam pela necessidade de negócio, detalham os comportamentos esperados e mostram como a solução é estruturada tecnicamente.

| Para quem | Melhor ponto de partida | O que encontrará |
|---|---|---|
| **Product Owner e stakeholders** | [Documento de Visão](visao/Documento-de-Visao-SGV.docx) | Problema, proposta de valor, escopo, perfis envolvidos e prioridades do produto. |
| **Equipe de desenvolvimento** | [Requisitos do produto](requisitos.md) | Fluxo de viagens, regras de negócio e restrições técnicas que orientam a implementação. |
| **Analistas e validadores** | [UC01 — Registrar viagem](casos-de-uso/UC01-Registrar-Viagem.md) | Jornada principal do colaborador, exceções e critérios do cadastro de viagens. |
| **Equipe técnica** | [Arquitetura do SGV](arquitetura/README.md) | Relação entre interface, API, banco de dados e ambiente integrado. |

---

## Artefatos do produto

| Artefato | Objetivo | Público principal |
|---|---|---|
| [Documento de Visão](visao/Documento-de-Visao-SGV.docx) | Comunicar por que o SGV existe, qual valor entrega e quais limites orientam sua evolução. | Product Owner, stakeholders e equipe. |
| [Requisitos do produto](requisitos.md) | Traduzir a visão em comportamentos, regras e restrições verificáveis. | Equipe, Product Owner e validação. |
| [UC01 — Registrar viagem](casos-de-uso/UC01-Registrar-Viagem.md) | Descrever a primeira jornada de valor disponibilizada pelo sistema. | Equipe, Product Owner e usuários. |
| [Diagrama de caso de uso](casos-de-uso/diagrama-caso-de-uso.png) | Tornar visíveis os casos de uso e os perfis que interagem com o SGV. | Todos os públicos. |
| [Arquitetura do SGV](arquitetura/README.md) | Apresentar a composição executável da solução e a responsabilidade de cada camada. | Equipe técnica e avaliadores. |
| [Configuração de ambiente](ambiente.md) | Explicar a execução local e a proteção de credenciais e variáveis sensíveis. | Equipe técnica e avaliadores. |
| [Encerramento da Sprint 0](sprints/sprint-0.md) | Registrar a baseline de artefatos integrada ao fim da primeira sprint. | Equipe e avaliadores. |

---

## Estado do demonstrador

> **Sprint 0:** a interface React funciona como demonstrador visual com estado local. A API Spring Boot e o PostgreSQL foram validados com Docker Compose, mas a interface ainda não consome os endpoints da API. A integração frontend–API é uma evolução planejada para as próximas sprints.

## Governança dos artefatos

Os documentos desta pasta são versionados com o código-fonte. Ao final de cada sprint, a equipe cria uma tag anotada no padrão `sprint-<número>` para congelar uma baseline integrada de frontend, backend, scripts de banco, configuração e documentação.

| Elemento | Local de controle |
|---|---|
| Código e documentação | Repositório GitHub do projeto. |
| Planejamento, tarefas e rastreabilidade | Jira do projeto. |
| Estado de dados relevante | Backup lógico do PostgreSQL associado ao encerramento da sprint. |
| Baseline de cada sprint | Tag anotada, como [`sprint-0`](https://github.com/gabrielhochmann-academic/es2-travel-management/tree/sprint-0). |
