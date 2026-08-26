# Sistema de Gestão de Viagens

> **SGV - Sistema de Gestão de Viagens**
>
> Uma aplicação web para organizar o planejamento, a aprovação e o acompanhamento de viagens corporativas.

O SGV centraliza informações que normalmente ficam dispersas entre planilhas, e-mails e mensagens. A proposta é oferecer ao colaborador uma jornada clara de solicitação e ao gestor mais visibilidade para decidir e acompanhar as viagens da organização.

## Visão rápida do produto

| Para o colaborador | Para o gestor | Para a organização |
|---|---|---|
| Registra e acompanha a própria solicitação de viagem. | Analisa solicitações e toma decisões de aprovação ou rejeição. | Mantém informações organizadas para consultas e indicadores futuros. |

> **Sprint 1:** a interface React consome a API Spring Boot. O cadastro de empregados e o planejamento de viagens são persistidos no PostgreSQL por migrações Flyway.

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
| [Requisitos da Sprint 1](docs/requisitos.md) | Capacidades, regras de negócio e restrições técnicas implementadas. |
| [UC00 - Cadastrar empregado](docs/casos-de-uso/UC00-Cadastrar-Empregado.md) | Jornada para disponibilizar empregados no planejamento de viagem. |
| [UC01 - Registrar viagem](docs/casos-de-uso/UC01-Registrar-Viagem.md) | Jornada do colaborador para registrar uma viagem vinculada a empregado. |
| [MER do SGV](docs/modelagem/MER-SGV.md) | Modelo entidade relacionamento de empregados e viagens. |
| [Arquitetura do SGV](docs/arquitetura/README.md) | Relação entre interface, API, banco de dados e Docker Compose. |
| [Encerramento da Sprint 0](docs/sprints/sprint-0.md) | Baseline de artefatos identificada pela tag `sprint-0`. |
| [Planejamento da Sprint 1](docs/sprints/sprint-1.md) | Objetivo, escopo, critérios de aceite e referências da entrega atual. |

---

## Execução local

Antes de iniciar os serviços pela primeira vez, crie a configuração local a partir do modelo versionado:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e ajuste a senha local do PostgreSQL. Esse arquivo é ignorado pelo Git e não deve ser compartilhado. Se já houver um volume `postgres_data` criado com outra credencial, mantenha a configuração compatível ou recrie o ambiente com `docker compose down -v` antes de subir novamente. Esse comando remove os dados locais do banco.

> **Atualização da Sprint 1:** como o banco agora cria um usuário específico para a aplicação e aplica migrações Flyway, um volume local herdado da Sprint 0 deve ser recriado antes da primeira execução desta versão. Em ambiente de desenvolvimento, execute `docker compose down -v` e depois `docker compose up --build`. O comando remove somente os dados locais do PostgreSQL.

Com o **Docker Desktop** em execução, abra um terminal na raiz do repositório e execute:

```bash
docker compose up --build
```

| Serviço | Endereço | Finalidade |
|---|---|---|
| Interface | `http://localhost:5173` | Acessar o demonstrador visual do SGV. |
| API | `http://localhost:8080` | Acessar os serviços de negócio. |
| Lista de empregados | `http://localhost:8080/api/employees` | Consultar os empregados persistidos pela API. |
| Lista de viagens | `http://localhost:8080/api/trips` | Consultar as viagens persistidas pela API. |
| PostgreSQL | `localhost:5432` | Acessar o banco de dados local, quando necessário. |

Para encerrar a execução interativa, use `Ctrl + C`. Os dados do PostgreSQL permanecem no volume nomeado `postgres_data`.

---

## Organização do repositório

```text
.
├── backend/            API Spring Boot
├── database/           Inicialização local do PostgreSQL e usuário da aplicação
├── docs/               Visão de produto, requisitos, casos de uso, MER e arquitetura
├── frontend/           Interface React
└── docker-compose.yml  Execução integrada dos serviços
```

## Versionamento por sprint

Ao término de cada sprint, a equipe cria uma tag anotada na `main` seguindo o padrão `sprint-<número>`, como `sprint-0`, `sprint-1` e `sprint-2`. A tag identifica a versão integrada de código, scripts e documentação correspondente ao encerramento da sprint.
