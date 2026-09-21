# Revisões e retrospectivas consolidadas

Este documento reúne as evidências de revisão e retrospectiva das sprints do SGV. Ele substitui registros dispersos e mantém a documentação final em um único ponto.

## Sprint 0

**Revisão:** foram apresentados o demonstrador React, a API Spring Boot, o PostgreSQL, o Docker Compose, o Documento de Visão, requisitos e caso de uso. O professor solicitou melhoria visual, padronização dos artefatos, organização das credenciais, uso de tags e maior rastreabilidade.

**Retrospectiva:** a equipe identificou excesso de arquivos auxiliares, documentação redundante e afirmações que não distinguiam o demonstrador local da persistência real. Foram simplificados os documentos, externalizadas as credenciais e criada a tag `sprint-0`.

## Sprint 1

**Revisão:** foram atualizados os artefatos de planejamento, requisitos, modelagem, horas e organização do quadro. Parte do desenvolvimento permaneceu em um PR amplo e não foi integrada à `main`.

**Retrospectiva:** o principal problema foi a divergência entre `develop`, branches de trabalho, Jira e `main`. A equipe passou a considerar a `main` e suas tags como fonte de evidência da entrega.

## Sprint 2

**Revisão:** a API demonstrou submissão, aprovação e rejeição. Os artefatos de aprovação, User Stories, horas e burndown foram adicionados.

**Retrospectiva:** requisitos importantes ficaram pendentes, principalmente cancelamento, ajustes, controle de perfil gestor, cadastro de empregado e históricos. A tag `sprint-2` também ficou apontando para um commit anterior ao encerramento e foi registrada como débito técnico.

## Sprint 3

**Revisão:** foram produzidos artefatos sobre custos, painel financeiro, horas e burndown.

**Retrospectiva:** a documentação foi concluída antes da integração do código correspondente. O custo por categorias e o dashboard ficaram em branch separada e foram levados para a Sprint 4.

## Sprint 4

**Revisão:** foram integrados os custos de deslocamento, hospedagem e táxi, o cálculo do custo total e o painel com indicadores. O backend e o frontend foram compilados, e testes unitários foram adicionados às regras principais.

**Retrospectiva:** a entrega final exigiu alinhar o Jira ao código realmente disponível. Permaneceram débitos técnicos sobre integração da tela principal, fluxo completo de aprovação, cadastro e histórico de empregados, histórico de tags e qualidade automatizada.

## Ações de melhoria

| Ação | Resultado esperado |
|---|---|
| Manter somente uma fonte de integração | `main` representa a entrega validada |
| Abrir PRs pequenos e ligados ao Jira | Revisão e rastreabilidade mais simples |
| Registrar evidências antes de concluir tarefas | Status do Jira compatível com o repositório |
| Não registrar horas estimadas como realizadas | Relatório de esforço baseado em dados reais |
| Criar tags somente depois da integração | Baseline recuperável e confiável |
