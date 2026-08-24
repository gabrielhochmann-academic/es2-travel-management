# Documento de Visão

| Projeto | Sistema de Gestão de Viagens (SGV) |
|---|---|
| Disciplina | Engenharia de Software II — UNIOESTE |
| Versão | 0.1 |
| Data | 24/08/2026 |
| Autoria | Equipe ES2 |

## 1. Objetivo do sistema

O Sistema de Gestão de Viagens tem como objetivo organizar o registro e o acompanhamento de viagens corporativas. A solução centraliza informações que normalmente ficam dispersas em planilhas, mensagens e documentos, permitindo consultar cada viagem desde o seu cadastro até a decisão de aprovação.

## 2. Escopo

O sistema contempla o registro de viagens com destino, período, motivo, meio de transporte e responsável. Cada viagem é criada em situação de rascunho, podendo ser submetida para análise e receber aprovação ou rejeição.

No exemplo técnico atual, estão incluídos a interface web, a API REST, a persistência em PostgreSQL e a execução por Docker Compose.

## 3. Problemas identificados

| Problema | Impacto | Solução proposta |
|---|---|---|
| Informações de viagens distribuídas em planilhas e mensagens | Dificuldade de consulta e acompanhamento | Registro centralizado de viagens. |
| Ausência de situação definida para cada solicitação | Incerteza sobre o andamento da viagem | Situações Rascunho, Solicitada, Aprovada e Rejeitada. |
| Aprovações sem registro estruturado | Dificuldade de acompanhar decisões | Fluxo de submissão e decisão registrado pelo sistema. |

## 4. Usuários envolvidos

| Usuário | Responsabilidade |
|---|---|
| Colaborador | Registra a viagem e a submete para análise. |
| Gestor | Analisa uma viagem submetida e decide por aprová-la ou rejeitá-la. |

## 5. Processos de negócio

1. O colaborador registra uma viagem em rascunho.
2. O colaborador submete a viagem para análise.
3. O gestor aprova ou rejeita a solicitação.
4. As viagens registradas permanecem disponíveis para consulta.

## 6. Necessidades atendidas

| Código | Necessidade |
|---|---|
| NEC01 | Centralizar o cadastro de viagens corporativas. |
| NEC02 | Identificar a situação de cada viagem. |
| NEC03 | Registrar decisões de aprovação ou rejeição. |
| NEC04 | Consultar as viagens cadastradas. |

## 7. Restrições de projeto

| Área | Definição |
|---|---|
| Interface | React, TypeScript e Vite. |
| API | Spring Boot e Java 21. |
| Persistência | PostgreSQL 16. |
| Execução | Docker Compose. |
