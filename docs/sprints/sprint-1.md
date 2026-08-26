# Sprint 1 | Planejamento de viagem

| Elemento | Definição |
|---|---|
| Período | 25/08/2026 a 31/08/2026 |
| Objetivo | Entregar o cadastro de empregados e o planejamento de viagens persistidos, integrados e documentados. |
| Backlog principal | [ES2-13](https://gabrielhochmann.atlassian.net/browse/ES2-13), Inserir Viagem. |
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

## Critérios de aceite da entrega

1. O sistema cadastra empregado com matrícula, nome e área.
2. O sistema registra viagem com empregado previamente cadastrado, destino, datas, motivo e meio de transporte.
3. O sistema impede data de retorno anterior à data de saída.
4. O sistema gera número único e inicia a viagem como Rascunho.
5. A interface React consome os endpoints reais de empregados e viagens.
6. O ambiente é composto por frontend, backend e PostgreSQL em Docker Compose.

## Limites de registro

As horas individuais, as dailys, a revisão da Sprint 0 e a retrospectiva da Sprint 0 devem ser registradas com informações efetivamente fornecidas pelo grupo. Esses registros não são preenchidos neste documento para evitar atribuições ou evidências artificiais.
