# Sistema de Gestão de Viagens

> **SGV - Sistema de Gestão de Viagens**
>
> Uma aplicação web para organizar o planejamento, a aprovação e o acompanhamento de viagens corporativas.

O SGV centraliza informações que normalmente ficam dispersas entre planilhas, e-mails e mensagens. A proposta é oferecer ao colaborador uma jornada clara de solicitação e ao gestor mais visibilidade para decidir e acompanhar as viagens da organização.

## Visão rápida do produto

| Para o colaborador | Para o gestor | Para a organização |
|---|---|---|
| Registra e acompanha a própria solicitação de viagem. | Analisa solicitações e toma decisões de aprovação ou rejeição. | Mantém informações organizadas para consultas e indicadores futuros. |

> **Sprint 0:** a interface React funciona como demonstrador visual com estado local. A API Spring Boot e o PostgreSQL foram validados com Docker Compose. A integração entre a interface e a API será tratada nas próximas sprints.

---

## Arquitetura e tecnologias

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| **Interface** | React, TypeScript e Vite | Apresentar a experiência do usuário. |
| **API** | Spring Boot e Java 21 | Aplicar regras de negócio e disponibilizar endpoints REST. |
| **Dados** | PostgreSQL 16 | Persistir informações sobre viagens. |
| **Execução** | Docker Compose | Subir os serviços de forma integrada no ambiente local. |
| **Gestão** | GitHub e Jira | Versionar artefatos e acompanhar o trabalho da equipe. |

---

## Navegue pelos artefatos

| Artefato | O que ele comunica |
|---|---|
| [Documento de Visão](docs/visao/Documento-de-Visao-SGV.docx) | Problema, valor, escopo, usuários e prioridades do SGV. |
| [Requisitos do produto](docs/requisitos.md) | Capacidades, regras de negócio e restrições técnicas. |
| [Casos de Uso](docs/casos-de-uso) |  Descrição Textual e Visual. |
| [MER](docs/MER) |  Modelo Entidade Relacionamento. |
| [Arquitetura do SGV](docs/arquitetura/README.md) | Relação entre interface, API, banco de dados e Docker Compose. |
| [Encerramento da Sprint 0](docs/sprints/sprint-0.md) | Baseline de artefatos identificada pela tag `sprint-0`. |
| [Encerramento da Sprint 1](docs/sprints/sprint-1.md) | Baseline de artefatos identificada pela tag `sprint-1`. |
| [Horas](docs/Horas) | Horas Trabalhadas e Burndown Chart. |
| [User Stories](docs/User-Stories) | Funcionalidade do Software. |

---

## Execução local

Antes de iniciar os serviços pela primeira vez, crie a configuração local a partir do modelo versionado:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e ajuste a senha local do PostgreSQL. Esse arquivo é ignorado pelo Git e não deve ser compartilhado. Se já houver um volume `postgres_data` criado com outra credencial, mantenha a configuração compatível ou recrie o ambiente com `docker compose down -v` antes de subir novamente. Esse comando remove os dados locais do banco.

Com o **Docker Desktop** em execução, abra um terminal na raiz do repositório e execute:

```bash
docker compose up --build
```

| Serviço | Endereço | Finalidade |
|---|---|---|
| Interface | `http://localhost:5173` | Acessar o demonstrador visual do SGV. |
| API | `http://localhost:8080` | Acessar os serviços de negócio. |
| Lista de viagens | `http://localhost:8080/api/trips` | Consultar as viagens persistidas pela API. |
| PostgreSQL | `localhost:5432` | Acessar o banco de dados local, quando necessário. |

Para encerrar a execução interativa, use `Ctrl + C`. Os dados do PostgreSQL permanecem no volume nomeado `postgres_data`.

---

## Organização do repositório

```text
.
├── backend/            API Spring Boot
├── database/           Estrutura versionada do PostgreSQL
│   └── trips.sql       Tabela de viagens e índices relacionados
├── docs/               Visão de produto, requisitos, casos de uso e arquitetura
├── frontend/           Interface React
└── docker-compose.yml  Execução integrada dos serviços
```

## Versionamento por sprint

Ao término de cada sprint, a equipe cria uma tag anotada na `main` seguindo o padrão `sprint-<número>`, como `sprint-0`, `sprint-1` e `sprint-2`. A tag identifica a versão integrada de código, scripts e documentação correspondente ao encerramento da sprint.
