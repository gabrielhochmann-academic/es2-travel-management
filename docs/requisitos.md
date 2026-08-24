# Requisitos iniciais — Sistema de Gestão de Viagens

## 1. Objetivo

O Sistema de Gestão de Viagens permite registrar e acompanhar viagens corporativas. O exemplo técnico utiliza o cadastro de viagens como fluxo principal.

## 2. Requisitos funcionais

| Código | Requisito |
|---|---|
| RF01 | O sistema deve permitir registrar uma viagem com destino, período, motivo, meio de transporte e responsável. |
| RF02 | Uma viagem registrada deve iniciar na situação **Rascunho**. |
| RF03 | O sistema deve permitir consultar as viagens registradas. |
| RF04 | Uma viagem em rascunho pode ser submetida para análise. |
| RF05 | Uma viagem submetida pode ser aprovada ou rejeitada. |

## 3. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | Destino, período, motivo, meio de transporte e responsável são obrigatórios. |
| RN02 | A data de retorno deve ser igual ou posterior à data de saída. |
| RN03 | O registro inicial de uma viagem possui situação **Rascunho**. |
| RN04 | Somente viagens em rascunho podem ser submetidas para análise. |
| RN05 | Somente viagens submetidas podem receber aprovação ou rejeição. |
| RN06 | A rejeição de uma viagem exige justificativa. |

## 4. Restrições técnicas

| Código | Restrição |
|---|---|
| RT01 | A aplicação deve possuir interface web desenvolvida em React e TypeScript. |
| RT02 | A API deve ser implementada em Spring Boot com Java 21. |
| RT03 | Os dados devem ser armazenados em PostgreSQL. |
| RT04 | Os serviços devem poder ser executados localmente com Docker Compose. |

## 5. Escopo do exemplo

O exemplo técnico concentra-se no registro de viagens e no ciclo de situação Rascunho, Solicitada, Aprovada e Rejeitada. Outros módulos do produto serão detalhados conforme o planejamento da disciplina.
