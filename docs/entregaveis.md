# Entregáveis Acadêmicos e Evidências

Este documento traduz os entregáveis esperados do SGV em artefatos verificáveis. Um item é considerado entregue somente quando estiver versionado ou vinculado a uma evidência técnica real no Jira.

## Entregáveis esperados

| Entregável | Local previsto no repositório | Evidência mínima |
|---|---|---|
| Documento de Visão | `docs/visao/` | Documento versionado com objetivo, escopo, partes interessadas e visão do produto. |
| Documento de requisitos | `docs/requisitos.md` | Requisitos funcionais, regras de negócio, requisitos técnicos e rastreabilidade atualizados. |
| User Stories | Jira ES2 e, quando necessário, `docs/user-stories/` | Story com descrição, critérios de aceite, prioridade e vínculo ao Epic. |
| Modelo de dados | `docs/modelagem/` | Diagrama e descrição das entidades, relacionamentos e restrições. |
| Diagramas UML | `docs/uml/` | Diagramas de classes e de sequência com fonte editável e imagem exportada. |
| Protótipos de telas | `docs/prototipos/` | Link ou arquivos dos protótipos, identificando telas e fluxos cobertos. |
| Código-fonte | `frontend/` e `backend/` | Código versionado, revisado e associado às issues implementadas. |
| Scripts de banco de dados | `database/001_create_trips.sql` | Script inicial de criação da tabela de viagens, compatível com PostgreSQL. |
| Configurações Docker | Raiz do projeto e diretórios de serviços | Arquivos de containerização e instruções reais de execução. |
| Sistema funcional local | `README.md` e evidência no Jira | Passo a passo validado, serviços necessários e resultado do teste local. |

## Definição de pronto para uma entrega

Uma entrega deve atender aos critérios aplicáveis abaixo antes de sua issue ser movida para **Concluído**:

1. O artefato está versionado no repositório ou vinculado por URL estável.
2. O link do arquivo, commit ou pull request está registrado na issue do Jira.
3. O conteúdo é consistente com os requisitos e o Sprint Backlog.
4. Não há credenciais, dados pessoais ou arquivos gerados indevidos no commit.
5. Quando houver execução, o resultado do teste está registrado de forma objetiva.

## Cerimônias e artefatos SCRUM

| Elemento | Registro esperado |
|---|---|
| Sprint Planning | Sprint criada/ativada no Jira, objetivo definido e itens selecionados no Sprint Backlog. |
| Reuniões diárias | Registro breve de impedimentos e decisões relevantes na issue ou no canal acordado pelo grupo. |
| Sprint Review | Demonstração do incremento e vínculo para a evidência apresentada. |
| Sprint Retrospective | Registro dos pontos de melhoria e das ações acordadas para a Sprint seguinte. |
| Product Backlog | Epics e Stories priorizados no Jira. |
| Sprint Backlog | Itens selecionados para a Sprint ativa. |
| Incremento | Conjunto de artefatos e código realmente concluídos, testados e demonstráveis. |

> Cerimônias não devem ser declaradas como realizadas sem um registro correspondente. Um registro curto, datado e objetivo é suficiente quando não houver exigência de ata formal.
