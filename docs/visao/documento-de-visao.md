# Documento de Visão

| Projeto | Sistema de Gestão de Viagens (SGV) |
|---|---|
| Disciplina | Engenharia de Software II — UNIOESTE |
| Versão | 0.1 — Exemplo de preparação da Sprint 0 |
| Estado | Documento-base; sujeito ao refinamento com o Product Owner |

## 1. Objetivo do sistema

O SGV é uma aplicação web para centralizar o planejamento, o acompanhamento e a análise de viagens corporativas. A proposta é substituir o controle fragmentado em planilhas e e-mails por um fluxo rastreável, composto por cadastro, submissão, aprovação, registro de despesas e indicadores gerenciais.

## 2. Escopo inicial

O produto deve permitir que colaboradores registrem viagens com destino, período, motivo e meio de transporte. Uma viagem é criada em **Rascunho**, pode ser submetida para análise e receber aprovação ou rejeição de um gestor. Após aprovada, pode receber despesas. O sistema também deve permitir consultas por destino, período e situação, além de apresentar indicadores gerenciais.

| Incluído no escopo | Fora do escopo deste exemplo de Sprint 0 |
|---|---|
| Planejamento, aprovação, despesas, consultas e indicadores | Integração com ERP, emissão de passagens, pagamentos e autenticação corporativa real |
| API REST, frontend React, backend Spring Boot, PostgreSQL e Docker | Regras adicionais ainda não validadas com o Product Owner |

## 3. Problemas a resolver

| Problema | Quem é afetado | Impacto | Direção proposta |
|---|---|---|---|
| Viagens controladas por planilhas e e-mails | Colaboradores e gestores | Informações dispersas e difícil acompanhamento | Registro estruturado de viagens e seus estados |
| Aprovação sem histórico centralizado | Gestores e solicitantes | Decisões sem rastreabilidade | Fluxo de rascunho, solicitação, aprovação e rejeição com histórico |
| Gastos sem consolidação por viagem | Gestores | Dificuldade para acompanhar custos | Despesas vinculadas somente a viagens aprovadas e total consolidado |
| Falta de indicadores | Gestão | Baixa visibilidade sobre uso e gastos | Painel com quantidades, valores, destino mais visitado e custo médio |

## 4. Usuários envolvidos

| Perfil | Responsabilidade no SGV |
|---|---|
| Colaborador | Planejar, cadastrar, consultar, alterar, excluir e submeter as próprias viagens; registrar despesas de viagens aprovadas. |
| Gestor | Analisar viagens solicitadas, aprovar ou rejeitar com justificativa quando necessário e consultar indicadores. |
| Equipe de desenvolvimento | Construir, validar e manter o sistema e seus artefatos acadêmicos. |

## 5. Visão do sistema

O SGV organiza a viagem como uma unidade de negócio com responsável, período, motivo, meio de transporte, situação e custos associados. O fluxo se inicia em rascunho, passa pela solicitação e termina em aprovação ou rejeição. As informações gerenciais derivam de dados reais registrados no sistema.

> O protótipo e a aplicação da Sprint 0 demonstram a arquitetura e um fluxo básico de viagem. Eles não substituem o refinamento dos requisitos e dos critérios de aceite com o Product Owner.

## 6. Processos de negócio envolvidos

1. **Planejar viagem:** o colaborador registra informações obrigatórias e salva em rascunho.
2. **Submeter para análise:** a viagem planejada passa para a situação Solicitada.
3. **Decidir solicitação:** o gestor aprova ou rejeita; rejeições exigem justificativa.
4. **Acompanhar custos:** despesas são registradas somente para viagens aprovadas.
5. **Consultar e analisar:** usuários pesquisam viagens e gestores acompanham os indicadores consolidados.

## 7. Necessidades e requisitos prioritários

| Código | Necessidade | Resposta prevista |
|---|---|---|
| NEC01 | Centralizar informações de viagens | Cadastro estruturado e consulta de viagens. |
| NEC02 | Controlar o ciclo de aprovação | Estados Rascunho, Solicitada, Aprovada e Rejeitada. |
| NEC03 | Registrar custos com regras claras | Despesas válidas apenas em viagens aprovadas e com valor positivo. |
| NEC04 | Consultar registros rapidamente | Filtros por destino, período e situação. |
| NEC05 | Apoiar decisões gerenciais | Indicadores numéricos e painéis gráficos. |

## 8. Restrições técnicas e de projeto

| Área | Decisão da Sprint 0 |
|---|---|
| Frontend | React + TypeScript, para demonstrar a interface e o fluxo de uma viagem. |
| Backend | Spring Boot com API REST. |
| Persistência | PostgreSQL, mantendo os dados fora do ciclo de vida dos containers. |
| Execução | Docker Compose com serviços de frontend, backend e banco de dados. |
| Método de trabalho | SCRUM, usando Jira para backlog/Sprints e GitHub para código e evidências. |

## 9. Critérios de evolução

Antes de considerar este documento definitivo, a equipe deve validar com o Product Owner os papéis, os campos das viagens, o comportamento de alterações após rejeição, os critérios de despesa e a priorização dos indicadores.
