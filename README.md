# Sistema de Gestão de Viagens

> **SGV - Sistema de Gestão de Viagens**
>
> Aplicação acadêmica para planejar viagens, acompanhar aprovações e consolidar custos.

## Estado atual

O projeto possui frontend React integrado à API Spring Boot, persistência em PostgreSQL e execução por Docker Compose.

| Capacidade | Estado |
|---|---|
| Cadastrar áreas, cargos e empregados | Implementado |
| Validar matrícula no formato `XXXX-X` | Implementado |
| Manter cargo, área e histórico funcional | Implementado |
| Criar, editar, listar e cancelar viagens | Implementado |
| Submeter, aprovar, rejeitar e solicitar ajustes | Implementado |
| Validar decisões feitas por gestor | Implementado |
| Manter histórico das situações | Implementado |
| Registrar deslocamento, hospedagem e táxi | Implementado |
| Calcular custo total | Implementado |
| Exibir indicadores de custos e situações | Implementado |

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React, TypeScript e Vite |
| API | Spring Boot e Java 21 |
| Dados | PostgreSQL 16 |
| Execução | Docker Compose |
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
| Revisões e retrospectivas | [docs/sprints/revisoes-e-retrospectivas.md](docs/sprints/revisoes-e-retrospectivas.md) |
| Débitos técnicos | [docs/sprints/debitos-tecnicos.md](docs/sprints/debitos-tecnicos.md) |
| Horas e burndown | [docs/Horas](docs/Horas) |
| User Stories | [docs/User-Stories](docs/User-Stories) |

## Execução local

Crie a configuração local a partir do modelo versionado:

```bash
cp .env.example .env
```

Defina uma senha local em `.env`. O arquivo é ignorado pelo Git e não deve ser compartilhado.

### Acesso ao banco

O ambiente cria três perfis separados na primeira inicialização do volume:

| Perfil | Uso | Permissões |
|---|---|---|
| `POSTGRES_ADMIN_USER` | Administração local e criação da estrutura | Administrador do banco local |
| `POSTGRES_APP_USER` | Backend Spring Boot | Conectar, consultar, inserir, alterar e excluir dados da aplicação |
| `POSTGRES_READONLY_USER` | Consultas locais ou relatórios | Perfil `sgv_readonly`, somente leitura |

O backend utiliza somente `POSTGRES_APP_USER`. O PostgreSQL é publicado apenas em `127.0.0.1:5432`. Para aplicar a nova política de acesso em um ambiente local já existente, recrie o volume conforme o comando abaixo.

Com o Docker Desktop em execução:

```bash
docker compose up --build
```

Em um banco novo, o Docker também executa automaticamente `database/03_seed_demo_data.sql`, criando áreas, cargos, empregados, viagens, históricos e custos válidos para demonstração. O seed é idempotente e faz parte da inicialização do volume. Para reaplicá-lo do zero, recrie o volume local:

| Serviço | Endereço |
|---|---|
| Interface | `http://localhost:5173` |
| API | `http://localhost:8080` |
| Viagens | `http://localhost:8080/api/trips` |
| Empregados | `http://localhost:8080/api/employees` |
| Áreas | `http://localhost:8080/api/areas` |
| Cargos | `http://localhost:8080/api/cargos` |
| Indicadores | `http://localhost:8080/api/trips/indicators/costs` |
| PostgreSQL | `localhost:5432` |

Se o ambiente foi iniciado com uma versão anterior do banco, recrie o volume local antes do primeiro uso desta versão:

```bash
docker compose down -v
docker compose up --build
```

## Validação

```bash
mvn --file backend/pom.xml test
npm --prefix frontend run build
docker compose config
```

## Versionamento por sprint

O padrão é `sprint-<número>`, em letras minúsculas e sem espaços. A tag deve apontar para o commit integrado na `main` que representa o encerramento da sprint.

```bash
git fetch --tags
git switch --detach sprint-3
```

Para recuperar somente um componente:

```bash
git restore --source=sprint-3 -- frontend/
```

## Estrutura

```text
.
├── backend/            API Spring Boot
├── database/           Estrutura versionada do PostgreSQL
├── docs/               Artefatos acadêmicos e registros das sprints
├── frontend/           Interface React
└── docker-compose.yml  Execução integrada
```
