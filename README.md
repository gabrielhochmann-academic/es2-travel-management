# Sistema de Gestão de Viagens

Projeto acadêmico da disciplina de Engenharia de Software II da UNIOESTE.

O Sistema de Gestão de Viagens (SGV) organiza o registro e o acompanhamento de viagens corporativas. O repositório contém a aplicação de exemplo, os documentos de análise e a configuração necessária para execução local.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React, TypeScript e Vite |
| API | Spring Boot e Java 21 |
| Banco de dados | PostgreSQL 16 |
| Execução local | Docker Compose |

## Documentação

| Artefato | Descrição |
|---|---|
| [Requisitos iniciais](docs/requisitos.md) | Requisitos e regras utilizados no exemplo técnico. |
| [Documento de Visão](docs/visao/Documento-de-Visao-SGV.docx) | Documento formal com contexto, objetivo, escopo, usuários e restrições do sistema. |
| [UC01 — Registrar viagem](docs/casos-de-uso/UC01-Registrar-Viagem.md) | Cadastro de viagem em rascunho e fluxos relacionados. |
| [Diagrama de caso de uso](docs/casos-de-uso/diagrama-caso-de-uso.png) | Representação UML dos fluxos do exemplo técnico. |
| [Arquitetura](docs/arquitetura/README.md) | Organização do frontend, backend, banco de dados e Docker Compose. |

## Execução local

Com Docker Desktop em execução, execute na raiz do projeto:

```bash
docker compose up --build
```

Depois, abra `http://localhost:5173`.

| Serviço | Endereço |
|---|---|
| Frontend | `http://localhost:5173` |
| API | `http://localhost:8080` |
| PostgreSQL | `localhost:5432` |

Para encerrar os serviços, pressione `Ctrl + C` no terminal. Os dados do PostgreSQL permanecem no volume `postgres_data`.

## Estrutura do projeto

```text
.
├── backend/          API Spring Boot
├── database/         Script de inicialização do PostgreSQL
├── docs/             Documentos e diagramas acadêmicos
├── frontend/         Interface React
└── docker-compose.yml
```
