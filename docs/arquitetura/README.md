# Arquitetura do exemplo técnico

O exemplo técnico é composto por três serviços executados pelo Docker Compose: interface web, API e banco de dados.

![Diagrama de arquitetura](arquitetura-exemplo.png)

| Componente | Tecnologia | Responsabilidade |
|---|---|---|
| Frontend | React, TypeScript, Vite e Nginx | Disponibiliza a interface web na porta `5173` e encaminha chamadas para `/api`. |
| Backend | Spring Boot e Java 21 | Disponibiliza a API REST na porta `8080`. |
| Banco de dados | PostgreSQL 16 | Armazena os dados de viagens. |
| Docker Compose | Docker | Cria e executa os serviços locais. |

O banco de dados utiliza o volume nomeado `postgres_data`, preservando os dados entre reinicializações dos containers.
