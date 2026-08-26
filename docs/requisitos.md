# Lista de Requisitos | Sprint 1

## 1. Objetivo

O Sistema de Gestão de Viagens apoia o planejamento e o acompanhamento de viagens corporativas. A Sprint 1 concentra-se no cadastro de empregados e no registro de viagens vinculadas a esses empregados.

## 2. Requisitos funcionais

| Código | Requisito |
|---|---|
| RF01 | O sistema deve permitir cadastrar empregado com matrícula, nome e área. |
| RF02 | O sistema deve permitir consultar os empregados cadastrados. |
| RF03 | O sistema deve permitir registrar uma viagem com destino, data de saída, data de retorno, motivo, meio de transporte e empregado cadastrado. |
| RF04 | O sistema deve gerar um número único para cada viagem registrada. |
| RF05 | O sistema deve permitir consultar as viagens registradas e seus empregados associados. |
| RF06 | O sistema deve permitir submeter uma viagem em Rascunho para análise. |
| RF07 | O sistema deve permitir aprovar ou rejeitar uma viagem submetida. |

## 3. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | Matrícula, nome e área são obrigatórios no cadastro de empregado. |
| RN02 | A matrícula do empregado deve ser única. |
| RN03 | Destino, data de saída, data de retorno, motivo, meio de transporte e empregado são obrigatórios no registro da viagem. |
| RN04 | O empregado associado à viagem deve estar previamente cadastrado. |
| RN05 | A data de retorno deve ser igual ou posterior à data de saída. |
| RN06 | O número da viagem é gerado pelo sistema e deve ser único. |
| RN07 | Toda viagem registrada inicia na situação Rascunho. |
| RN08 | Somente viagens em Rascunho podem ser submetidas para análise. |
| RN09 | Somente viagens submetidas podem receber aprovação ou rejeição. |
| RN10 | A rejeição de uma viagem exige justificativa. |

## 4. Restrições técnicas

| Código | Restrição |
|---|---|
| RT01 | A interface deve ser desenvolvida com React, TypeScript e Vite. |
| RT02 | A API deve ser implementada com Spring Boot e Java 21. |
| RT03 | Os dados devem ser armazenados em PostgreSQL 16. |
| RT04 | As migrações de banco devem ser versionadas e executadas pelo Flyway. |
| RT05 | A aplicação deve executar em três containers Docker Compose: frontend, backend e banco de dados. |
| RT06 | As credenciais de desenvolvimento devem permanecer em arquivo `.env` ignorado pelo Git. |

## 5. Rastreabilidade com a implementação

| Requisito | Componente responsável |
|---|---|
| RF01 e RF02 | `EmployeeController`, `EmployeeService`, `employees` e a seção Empregados da interface. |
| RF03 a RF05 | `TripController`, `TripService`, `trips` e a tela de planejamento. |
| RF06 e RF07 | Endpoints de submissão e decisão da viagem. |
| RN01 a RN10 | Validações do backend, restrições do banco e formulários obrigatórios da interface. |

## 6. Escopo da Sprint 1

Esta sprint entrega a base de cadastro de empregados e planejamento de viagens. Módulos de despesas, autenticação, relatórios e indicadores financeiros permanecem fora do escopo atual.
