# Sistema de Gestão de Viagens

> **SGV - Sistema de Gestão de Viagens**
>
> Aplicação acadêmica para planejar viagens, acompanhar aprovações e consolidar custos.

## Estado atual

O projeto possui frontend React, API Spring Boot, PostgreSQL e execução por Docker Compose. A tela principal de viagens ainda funciona como demonstrador com estado local. O painel de custos consome a API e persiste os valores no PostgreSQL.

| Capacidade | Estado na versão final |
|---|---|
| Criar e listar viagens pela API | Implementado |
| Submeter viagem | Implementado |
| Aprovar ou rejeitar viagem | Implementado |
| Registrar deslocamento, hospedagem e táxi | Implementado |
| Calcular custo total | Implementado no backend |
| Exibir indicadores de custos e situações | Implementado no painel de custos |
| Integrar a tela principal de viagens à API | Pendente |
| Cancelar viagem e solicitar ajustes | Pendente |
| Validar perfil de gestor | Pendente |
| Manter histórico de situações e de cargo/área | Pendente |
| Cadastrar empregado, cargo e área | Pendente |

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React, TypeScript e Vite |
| API | Spring Boot e Java 21 |
| Dados | PostgreSQL 16 |
| Execução | Docker Compose |
| Integração contínua | GitHub Actions |
| Gestão | GitHub e Jira |

## Artefatos

| Artefato | Localização |
|---|---|
| Documento de Visão | [docs/visao/Documento-de-Visao-SGV.docx](docs/visao/Documento-de-Visao-SGV.docx) |
| Requisitos | [docs/requisitos.md](docs/requisitos.md) |
| Casos de uso | [docs/casos-de-uso](docs/casos-de-uso) |
| Modelo entidade-relacionamento | [docs/MER/MER-SGV.md](docs/MER/MER-SGV.md) |
| Arquitetura | [docs/arquitetura/README.md](docs/arquitetura/README.md) |
| Encerramentos por sprint | [docs/sprints](docs/sprints) |
| Revisões e retrospectivas consolidadas | [docs/sprints/revisoes-e-retrospectivas.md](docs/sprints/revisoes-e-retrospectivas.md) |
| Horas e burndown | [docs/Horas](docs/Horas) |
| User Stories | [docs/User-Stories](docs/User-Stories) |

## Execução local

Crie a configuração local a partir do modelo versionado:

```bash
cp .env.example .env
```

Abra `.env` e defina uma senha local. O arquivo é ignorado pelo Git e não deve ser compartilhado.

Com o Docker Desktop em execução:

```bash
docker compose up --build
```

| Serviço | Endereço |
|---|---|
| Interface | `http://localhost:5173` |
| API | `http://localhost:8080` |
| Viagens | `http://localhost:8080/api/trips` |
| Indicadores de custos | `http://localhost:8080/api/trips/indicators/costs` |
| PostgreSQL | `localhost:5432` |

Para recriar o banco local, use `docker compose down -v`. Esse comando remove os dados do volume local.

## Validação

```bash
mvn --file backend/pom.xml test
npm --prefix frontend ci
npm --prefix frontend run build
```

O workflow `.github/workflows/ci.yml` executa essas validações em pushes e pull requests para a `main`.

## Versionamento por sprint

O padrão atual é `sprint-<número>`, em letras minúsculas e sem espaços. A tag deve apontar para um commit integrado na `main`.

```bash
git fetch --tags
git switch --detach sprint-3
```

Para recuperar somente um componente:

```bash
git restore --source=sprint-3 -- frontend/
```

As tags históricas devem representar exatamente o código e os artefatos integrados no encerramento de cada sprint. Divergências históricas identificadas estão registradas na documentação de cada sprint e no débito técnico, sem reescrever silenciosamente o histórico Git.

## Estrutura

```text
.
├── backend/            API Spring Boot
├── database/           Estrutura versionada do PostgreSQL
├── docs/               Artefatos acadêmicos e registros das sprints
├── frontend/           Interface React
└── docker-compose.yml  Execução integrada
```
