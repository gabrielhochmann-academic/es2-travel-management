# Sistema de Gestão de Viagens

> Projeto acadêmico colaborativo da disciplina de **Engenharia de Software II (ESII)** da UNIOESTE.

Este repositório concentra a documentação, os artefatos e, progressivamente, a implementação do **Sistema de Gestão de Viagens**. O Jira é utilizado para acompanhar o Product Backlog, as Sprints e as evidências de cada entrega; o GitHub registra a documentação revisada, o código e o histórico real de contribuições.

## Contexto e escopo acadêmico

A **Sprint 0 — Preparação** é dedicada à organização do ambiente colaborativo e à demonstração das ferramentas e práticas que apoiarão o projeto. Os requisitos definitivos do produto serão refinados com o Product Owner a partir da Sprint 1.

Por esse motivo, os documentos e a aplicação produzidos na Sprint 0 são **exemplos preparatórios**. Eles ilustram um fluxo simples relacionado a viagens e uma arquitetura técnica inicial, mas não constituem a especificação definitiva do Sistema de Gestão de Viagens.

| Entrega da Sprint 0 | Finalidade atual |
|---|---|
| Repositório GitHub | Espaço privado único para código, documentação e histórico de contribuições do grupo. |
| Documento de Visão | Modelo de estrutura a ser refinado após a elicitação com o Product Owner. |
| Caso de Uso | Exemplo relacionado a viagens, sujeito a revisão após o refinamento dos requisitos. |
| Exemplo de arquitetura | Aplicação reduzida para demonstrar o ambiente de desenvolvimento e suas camadas. |
| Kanban | Quadro único no Jira para acompanhar trabalho, responsabilidades e progresso da Sprint 0. |

## Planejamento do produto

O Product Backlog segue a prioridade acadêmica definida para a disciplina. O detalhamento e a seleção dos itens para cada Sprint devem ocorrer no Sprint Planning correspondente.

| Prioridade | Identificador | Funcionalidade |
|---:|---|---|
| 1 | RF#1 | Planejamento de Viagem |
| 2 | RF#2 | Controle de Aprovação de Viagem |
| 3 | RF#3 | Controle Financeiro de Viagem |
| 4 | RF#4 | Informações Gerenciais |

A documentação de apoio ao planejamento está em [docs/planejamento.md](docs/planejamento.md). Itens que ainda não foram refinados não devem ser tratados como requisitos definitivos.

## Documentação do projeto

| Documento | Conteúdo |
|---|---|
| [Índice da documentação](docs/README.md) | Mapa dos documentos acadêmicos do repositório. |
| [Especificação de requisitos](docs/requisitos.md) | Requisitos funcionais, regras de negócio, requisitos técnicos e matriz de rastreabilidade. |
| [Entregáveis acadêmicos](docs/entregaveis.md) | Artefatos esperados e critérios de evidência. |
| [Fluxo de Git](docs/fluxo-git.md) | Branches, commits, pull requests, releases e vínculo com o Jira. |
| [Documento de Visão](docs/visao/documento-de-visao.md) | Contexto, escopo, usuários, necessidades e restrições do SGV. |
| [Caso de uso UC01](docs/casos-de-uso/UC01-Registrar-Viagem.md) | Fluxo de registro de viagem, exceções e diagrama UML relacionado. |
| [Arquitetura da Sprint 0](docs/arquitetura/README.md) | Diagrama e explicação de React, Spring Boot, PostgreSQL e Docker. |

## Arquitetura de exemplo pretendida

A aplicação da Sprint 0 demonstra a colaboração entre um frontend em React + TypeScript, uma API REST em Spring Boot (Java 21), PostgreSQL e Docker Compose. O fluxo demonstrado registra viagens em rascunho, permite submetê-las para análise e registra decisões de aprovação ou rejeição.

O exemplo é intencionalmente limitado. Seu objetivo é apresentar um ambiente que o grupo compreenda, consiga executar localmente e possa evoluir após a definição dos requisitos reais.

## Estrutura prevista do repositório

```text
.
├── backend/                 # API REST Spring Boot
├── frontend/                # Interface React + TypeScript
├── docs/                    # Artefatos acadêmicos e diagramas
├── docker-compose.yml       # Orquestração local de frontend, backend e PostgreSQL
├── .env.example             # Referência de variáveis de ambiente locais
├── CONTRIBUTING.md
├── README.md
└── .gitignore
```

Dependências geradas, credenciais, arquivos de ambiente reais, dados pessoais e materiais de outras disciplinas não devem ser versionados.

## Execução local do exemplo

### Opção A — Docker Compose

Em uma máquina com Docker e Docker Compose disponíveis, execute:

```bash
docker compose up --build
```

Depois, abra `http://localhost:5173`. O PostgreSQL utiliza um volume nomeado (`postgres_data`) para manter os dados entre reinicializações dos containers.

### Opção B — Desenvolvimento local

Inicie um PostgreSQL local com base nas variáveis de `.env.example`. Em terminais separados, execute:

```bash
# backend
cd backend
mvn spring-boot:run

# frontend
cd frontend
npm install
npm run dev
```

O frontend local ficará disponível em `http://localhost:5173` e encaminhará chamadas para `/api` ao backend na porta `8080`.

> O demonstrador visual também contém dados de cenário para apresentação da Sprint 0. A persistência real é fornecida pelos endpoints Spring Boot quando o ambiente com PostgreSQL estiver em execução.

## Rastreabilidade entre Jira e GitHub

Toda alteração técnica deve ser associada a uma issue real do Jira. Utilize a chave da issue em branches, commits e pull requests somente quando houver trabalho efetivamente relacionado ao item.

| Elemento | Convenção |
|---|---|
| Branch de documentação | `docs/ES2-4-modelo-documento-visao` |
| Branch de funcionalidade | `feature/ES2-13-inserir-viagem` |
| Commit | `ES2-4 docs: add vision document model` |
| Pull request | `ES2-4 Add vision document model` |

Uma issue só deve ser marcada como concluída quando possuir evidência verificável, como arquivo, commit, pull request, teste ou checklist associado.

## Colaboração

Este repositório privado é a fonte única de verdade do grupo para código, documentação revisada e histórico de contribuições. Os commits devem ser objetivos, descritivos e coerentes com o estado real do trabalho no Jira.

As orientações de contribuição estão disponíveis em [CONTRIBUTING.md](CONTRIBUTING.md).

### Espaços oficiais

- **Jira:** [ES2 — Sistema de Gestão de Viagens](https://gabrielhochmann.atlassian.net/jira/software/projects/ES2/boards/1/backlog)
- **Repositório:** `gabrielhochmann-academic/es2-travel-management`
- **Integração Jira–GitHub:** GitHub for Atlassian restrito a este repositório.

### Acessos e papéis

| Pessoa ou equipe | Papel | Acesso ao repositório |
|---|---|---|
| Gabriel Hochmann | Proprietário da organização | Administrativo |
| `es2-team` | Equipe de colaboração de ES2 | Escrita |
| Diogo (`diogorafaelpasa`) | Integrante da equipe | Escrita |
| Angelo (`AngelV-c`) | Integrante da equipe | Escrita |

## Privacidade e integridade acadêmica

O repositório deve permanecer privado e restrito às pessoas autorizadas. Não inclua chaves, tokens, senhas, dados pessoais, arquivos locais ou conteúdo de outros projetos. A autoria e a divisão de trabalho devem refletir o histórico real registrado no GitHub e no Jira.

---

A documentação será atualizada à medida que os requisitos forem refinados e as entregas forem efetivamente concluídas.
