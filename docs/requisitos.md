# Especificação de Requisitos — Sistema de Gestão de Viagens

## 1. Apresentação do problema

A empresa XYZ realiza viagens para reuniões com clientes, treinamentos, eventos, congressos e visitas técnicas. O controle atual por planilhas e trocas de e-mail dificulta o acompanhamento de solicitações, o controle de gastos e a obtenção de informações gerenciais.

O **Sistema de Gestão de Viagens (SGV)** será uma aplicação web para centralizar o registro, o acompanhamento e a análise de viagens corporativas realizadas pelos colaboradores.

## 2. Objetivo

O SGV deve gerenciar as viagens realizadas pelos colaboradores, desde seu planejamento até o acompanhamento dos custos. Também deve apresentar informações gerenciais que apoiem gestores na tomada de decisão e no controle de gastos.

## 3. Requisitos funcionais

### RF01 — Planejamento de viagem

| ID | Requisito |
|---|---|
| RF01.1 | O sistema deve permitir registrar viagem com destino, período, motivo e meio de transporte. |
| RF01.2 | O usuário deve consultar viagens cadastradas. |
| RF01.3 | O usuário deve alterar viagens que ainda não tenham sido aprovadas. |
| RF01.4 | O usuário deve excluir viagens que ainda não tenham sido aprovadas. |
| RF01.5 | Cada viagem deve possuir como responsável o usuário que realizou seu cadastro. |

### RF02 — Controle de aprovação

| ID | Requisito |
|---|---|
| RF02.1 | Uma viagem deve ser criada inicialmente em situação de rascunho. |
| RF02.2 | O colaborador deve poder submeter uma viagem planejada para análise. |
| RF02.3 | Um gestor deve poder aprovar ou rejeitar uma viagem submetida. |
| RF02.4 | Em caso de rejeição, o gestor deve registrar uma justificativa. |
| RF02.5 | O sistema deve manter o histórico de todas as mudanças de situação da viagem. |
| RF02.6 | As situações suportadas são: Rascunho, Solicitada, Aprovada e Rejeitada. |
| RF02.7 | O usuário deve poder consultar o histórico completo de mudanças de situação de cada viagem. |

### RF03 — Controle financeiro

| ID | Requisito |
|---|---|
| RF03.1 | Após a aprovação da viagem, o colaborador deve poder registrar gastos do deslocamento. |
| RF03.2 | O sistema deve registrar despesas de hospedagem, alimentação, transporte, combustível, pedágios e outras despesas necessárias. |
| RF03.3 | Cada despesa deve registrar data, tipo, descrição e valor gasto. |
| RF03.4 | O sistema deve calcular automaticamente o total gasto na viagem. |
| RF03.5 | O usuário deve consultar as despesas lançadas e o resumo financeiro consolidado da viagem. |

### RF04 — Consultas e pesquisas

| ID | Requisito |
|---|---|
| RF04.1 | O sistema deve permitir localizar viagens por destino. |
| RF04.2 | O sistema deve permitir localizar viagens por período. |
| RF04.3 | O sistema deve permitir localizar viagens por situação. |
| RF04.4 | A pesquisa deve apresentar informações suficientes para identificar cada viagem e seus gastos. |

### RF05 — Informações gerenciais

| ID | Requisito |
|---|---|
| RF05.1 | O sistema deve informar a quantidade total de viagens cadastradas. |
| RF05.2 | O sistema deve informar a quantidade de viagens aprovadas. |
| RF05.3 | O sistema deve informar a quantidade de viagens rejeitadas. |
| RF05.4 | O sistema deve informar o valor total gasto com viagens. |
| RF05.5 | O sistema deve informar o destino mais visitado. |
| RF05.6 | O sistema deve informar o custo médio por viagem. |
| RF05.7 | As informações devem ser apresentadas por painéis gráficos e indicadores numéricos de fácil compreensão. |

## 4. Regras de negócio

| ID | Regra |
|---|---|
| RN01 | A data de retorno deve ser igual ou posterior à data de saída. |
| RN02 | O destino é obrigatório. |
| RN03 | O motivo é obrigatório. |
| RN04 | Somente viagens aprovadas podem receber lançamentos de despesas. |
| RN05 | Toda alteração de situação deve ser registrada em histórico. |
| RN06 | O total de uma viagem é a soma de suas despesas associadas. |
| RN07 | Despesas com valor igual ou inferior a zero não devem ser aceitas. |
| RN08 | Lançamentos com datas futuras não devem ser aceitos. |
| RN09 | Viagens rejeitadas não podem possuir despesas registradas. |

## 5. Requisitos técnicos

| ID | Requisito |
|---|---|
| RT01 | A solução deve ser uma aplicação web. |
| RT02 | A arquitetura deve separar frontend, backend e banco de dados. |
| RT03 | O frontend deve se comunicar com o backend por APIs REST. |
| RT04 | O backend deve utilizar Spring Boot. |
| RT05 | O banco de dados deve ser relacional, utilizando PostgreSQL. |
| RT06 | Cada parte da arquitetura deve executar em ambiente containerizado com Docker. |
| RT07 | Os dados devem permanecer armazenados após a reinicialização dos containers. |

## 6. Matriz inicial de rastreabilidade

| Área da especificação | Epic Jira | Direção de implementação |
|---|---|---|
| RF01 — Planejamento de Viagem | ES2-9 | Stories de inserir, alterar, excluir e consultar viagem; complementadas pelas regras de planejamento. |
| RF02 — Controle de Aprovação | ES2-10 | Stories para submissão, aprovação, rejeição e histórico de situação. |
| RF03 — Controle Financeiro | ES2-11 | Stories para registrar, listar e consolidar despesas. |
| RF04 — Consultas e pesquisas | ES2-9 | Critérios de consulta e filtros serão refinados junto às funcionalidades de planejamento. |
| RF05 — Informações Gerenciais | ES2-12 | Stories para indicadores e painéis analíticos. |
| Requisitos técnicos | ES2-6 e ES2-7 na Sprint 0; itens técnicos futuros vinculados às Stories correspondentes. | Arquitetura, persistência, APIs REST e Docker. |

## 7. Controle de mudanças

Qualquer alteração de requisito deve ser registrada em issue do Jira e refletida neste documento após validação. O refinamento pode detalhar regras, critérios de aceite e modelos de dados, mas não deve remover ou alterar o sentido dos requisitos sem uma decisão registrada.
