# Sprint 1 | Planejamento de viagem

| Elemento | Definição |
|---|---|
| Período | 25/08/2026 a 31/08/2026 |
| Objetivo | Entregar o cadastro de empregados e o planejamento de viagens persistidos, integrados e documentados. |
| Backlog selecionado | [ES2-13](https://gabrielhochmann.atlassian.net/browse/ES2-13), [ES2-24](https://gabrielhochmann.atlassian.net/browse/ES2-24), [ES2-25](https://gabrielhochmann.atlassian.net/browse/ES2-25), [ES2-28](https://gabrielhochmann.atlassian.net/browse/ES2-28), [ES2-29](https://gabrielhochmann.atlassian.net/browse/ES2-29), [ES2-30](https://gabrielhochmann.atlassian.net/browse/ES2-30), [ES2-31](https://gabrielhochmann.atlassian.net/browse/ES2-31), [ES2-32](https://gabrielhochmann.atlassian.net/browse/ES2-32), [ES2-33](https://gabrielhochmann.atlassian.net/browse/ES2-33), [ES2-34](https://gabrielhochmann.atlassian.net/browse/ES2-34), [ES2-35](https://gabrielhochmann.atlassian.net/browse/ES2-35) e [ES2-36](https://gabrielhochmann.atlassian.net/browse/ES2-36). |
| Situação de acompanhamento | A execução técnica é acompanhada no quadro Jira do projeto ES2. |

## Escopo da sprint

| Entrega | Evidência no repositório |
|---|---|
| Cadastro de empregados | Pacote `backend/src/main/java/br/edu/unioeste/es2/sgv/employee`. |
| Planejamento de viagem | Pacote `backend/src/main/java/br/edu/unioeste/es2/sgv/trip`. |
| Banco e migrações | `backend/src/main/resources/db/migration` e `database/init`. |
| Interface integrada | `frontend/src/pages/Home.tsx`. |
| Requisitos e modelagem | `docs/requisitos.md`, casos de uso e MER. |
| Documento de Visão | `docs/visao/Documento-de-Visao-SGV.docx`. |
| Integração contínua | `.github/workflows/ci.yml`, `.github/workflows/publish-images.yml` e a execução do GitHub Actions. |

## Critérios de aceite da entrega

1. O sistema cadastra empregado com matrícula, nome e área.
2. O sistema registra viagem com empregado previamente cadastrado, destino, datas, motivo e meio de transporte.
3. O sistema impede data de retorno anterior à data de saída.
4. O sistema gera número único e inicia a viagem como Rascunho.
5. A interface React consome os endpoints reais de empregados e viagens.
6. O ambiente é composto por frontend, backend e PostgreSQL em Docker Compose.

## Rastreabilidade

| Área | Issue | Evidências principais |
|---|---|---|
| Planejamento de viagem | ES2-13 | Pacotes `employee` e `trip`, `frontend/src/pages/Home.tsx`, requisitos, UC00, UC01 e MER. |
| Requisitos e modelagem | ES2-24 e ES2-25 | `docs/requisitos.md`, `docs/casos-de-uso` e `docs/modelagem/MER-SGV.md`. |
| Banco e execução local | ES2-28, ES2-29 e ES2-32 | Migrações Flyway, script de usuário da aplicação, `docker-compose.yml` e arquitetura. |
| Gestão e registros | ES2-30, ES2-31, ES2-33, ES2-34 e ES2-35 | README, documentos de Sprint 0 e Sprint 1, Jira e central de referências no Confluence. |
| Integração e entrega contínuas | ES2-36 | Workflows, [execução de CI 33121480613](https://github.com/gabrielhochmann-academic/es2-travel-management/actions/runs/33121480613), imagem de backend e imagem de frontend a publicar após merge na `main`. |

## Estado em 27/08/2026

As issues ES2-30, ES2-31 e ES2-34 estão concluídas. ES2-24 e ES2-25 estão em revisão. ES2-13, ES2-28, ES2-29, ES2-32, ES2-33 e ES2-36 permanecem em andamento. A validação integrada com Docker Compose foi executada com sucesso pelo GitHub Actions, incluindo empregado, viagem em RASCUNHO e interface. A publicação de imagens depende de merge posterior na `main`. A ES2-35 permanece em A Fazer até existirem registros reais de dailys e horas da equipe. As issues ES2-26 e ES2-27 não foram selecionadas para a Sprint 1.

## Limites de registro

As horas individuais e as dailys devem ser registradas com informações efetivamente fornecidas pelo grupo. Esses dados não são preenchidos neste documento para evitar atribuições ou evidências artificiais.
