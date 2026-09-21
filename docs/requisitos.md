# Requisitos do Produto - SGV

> **Propósito:** organizar o planejamento, a aprovação e os custos de viagens corporativas com rastreabilidade.

## Requisitos funcionais

| Código | Requisito | Estado |
|---|---|---|
| RF01 | Registrar viagem com número, destino, saída, retorno, motivo, transporte e empregado | Implementado |
| RF02 | Iniciar viagem em Rascunho | Implementado |
| RF03 | Consultar e editar viagens | Implementado |
| RF04 | Submeter viagem para análise | Implementado |
| RF05 | Cancelar viagem em Rascunho | Implementado |
| RF06 | Aprovar viagem solicitada | Implementado |
| RF07 | Rejeitar viagem solicitada com justificativa | Implementado |
| RF08 | Solicitar ajustes e permitir ressubmissão | Implementado |
| RF09 | Registrar histórico de situações com data e responsável | Implementado |
| RF10 | Cadastrar empregado com matrícula, nome, cargo e área | Implementado |
| RF11 | Cadastrar cargos associados aos perfis Colaborador e Gestor | Implementado |
| RF12 | Cadastrar áreas | Implementado |
| RF13 | Preservar histórico de cargo e área do empregado | Implementado |
| RF14 | Registrar custo de deslocamento, hospedagem e táxi | Implementado |
| RF15 | Calcular custo total da viagem | Implementado |
| RF16 | Exibir painel com pelo menos três indicadores | Implementado |

## Regras de negócio

| Código | Regra | Estado |
|---|---|---|
| RN01 | Todos os dados básicos da viagem são obrigatórios | Implementado |
| RN02 | O retorno deve ser igual ou posterior à saída | Implementado |
| RN03 | A situação inicial é Rascunho | Implementado |
| RN04 | Rascunho e Ajustes solicitados podem ser submetidos | Implementado |
| RN05 | Somente Solicitada pode receber decisão | Implementado |
| RN06 | Rejeição e solicitação de ajustes exigem justificativa | Implementado |
| RN07 | Somente empregado vinculado a cargo de perfil Gestor decide uma viagem | Implementado |
| RN08 | Matrícula segue o formato `XXXX-X`, somente dígitos | Implementado |
| RN09 | Custo total é deslocamento + hospedagem + táxi | Implementado |
| RN10 | Custos não podem ser negativos | Implementado |
| RN11 | Somente o solicitante edita, submete ou cancela sua viagem | Implementado |
| RN12 | A viagem preserva cargo e área do solicitante no momento da submissão | Implementado |

## Fluxo de situação

```text
Rascunho -> Solicitada -> Aprovada
        |             -> Rejeitada
        |             -> Ajustes solicitados -> edição -> Solicitada
        -> Cancelada
```

Cada mudança de situação registra data, responsável e justificativa quando necessária.

## Indicadores disponíveis

O endpoint `GET /api/trips/indicators/costs` fornece:

1. quantidade total de viagens;
2. quantidade de viagens aprovadas;
3. quantidade de viagens rejeitadas;
4. custo total;
5. custo médio por viagem;
6. custos por categoria;
7. viagem de maior custo.

## Restrições técnicas

| Código | Diretriz | Decisão |
|---|---|---|
| RT01 | Interface web | React e TypeScript |
| RT02 | API | Spring Boot com Java 21 |
| RT03 | Persistência | PostgreSQL 16 |
| RT04 | Execução integrada | Docker Compose |
| RT05 | Credenciais | Variáveis locais em `.env`, nunca versionadas |
| RT06 | Acesso ao banco | Usuário administrador separado do usuário da aplicação, com perfil de leitura futura |
| RT07 | Testes | Serviços de viagens, empregados, áreas e cargos cobertos por testes unitários |
