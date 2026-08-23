# Arquitetura de exemplo da Sprint 0

O exemplo demonstra a separação solicitada entre interface de usuário, serviços de negócio e persistência. A implementação foi organizada em três serviços: frontend React, backend Spring Boot e PostgreSQL, com Docker Compose como orquestrador local.

![Arquitetura React, Spring Boot e PostgreSQL](arquitetura-exemplo.png)

## Responsabilidades

| Camada | Tecnologia | Responsabilidade demonstrada |
|---|---|---|
| Interface | React + TypeScript + Vite | Exibir o fluxo de viagens e validar dados básicos do formulário. |
| Serviços | Spring Boot + REST | Criar viagens em rascunho, submetê-las e registrar decisões. |
| Persistência | PostgreSQL + JPA | Armazenar viagens e manter seus dados fora do ciclo de vida dos containers. |
| Orquestração | Docker Compose | Subir frontend, backend e banco com uma configuração única. |

> Este exemplo prioriza o fluxo de uma viagem. Histórico detalhado, despesas, filtros e indicadores serão incrementados nas Stories correspondentes após o refinamento do Product Owner.
