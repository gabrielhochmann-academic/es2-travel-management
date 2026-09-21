# Requisitos do Produto - SGV

> **Propósito:** organizar o planejamento, a aprovação e os custos de viagens corporativas com rastreabilidade.

## Requisitos funcionais

| Código | Requisito | Estado na versão final |
|---|---|---|
| RF01 | Registrar viagem com destino, saída, retorno, motivo, transporte e responsável | API implementada; tela principal local |
| RF02 | Iniciar viagem em Rascunho | Implementado |
| RF03 | Consultar viagens | API implementada; tela principal local |
| RF04 | Submeter viagem para análise | Implementado na API |
| RF05 | Cancelar viagem em Rascunho | Pendente |
| RF06 | Aprovar viagem solicitada | Implementado na API |
| RF07 | Rejeitar viagem solicitada com justificativa | Implementado na API |
| RF08 | Solicitar ajustes e permitir ressubmissão | Pendente |
| RF09 | Registrar histórico de situações com data e responsável | Pendente |
| RF10 | Cadastrar empregado com matrícula, nome, cargo e área | Pendente |
| RF11 | Cadastrar cargos Colaborador e Gestor | Pendente |
| RF12 | Cadastrar áreas | Pendente |
| RF13 | Preservar histórico de cargo e área do empregado | Pendente |
| RF14 | Registrar custo de deslocamento, hospedagem e táxi | Implementado |
| RF15 | Calcular custo total da viagem | Implementado no backend |
| RF16 | Exibir painel com pelo menos três indicadores | Implementado |

## Regras de negócio

| Código | Regra | Estado |
|---|---|---|
| RN01 | Todos os dados básicos da viagem são obrigatórios | Implementado na API |
| RN02 | O retorno deve ser igual ou posterior à saída | Implementado |
| RN03 | A situação inicial é Rascunho | Implementado |
| RN04 | Somente Rascunho pode ser submetida | Implementado |
| RN05 | Somente Solicitada pode ser aprovada ou rejeitada | Implementado |
| RN06 | Rejeição exige justificativa | Implementado |
| RN07 | Somente Gestor decide uma viagem | Pendente por ausência de autenticação e perfil |
| RN08 | Matrícula segue o formato `XXXX-X`, somente dígitos | Pendente |
| RN09 | Custo total é deslocamento + hospedagem + táxi | Implementado |
| RN10 | Custos não podem ser negativos | Implementado na API |

## Fluxo de situação

### Implementado

```text
Rascunho -> Solicitada -> Aprovada
                      -> Rejeitada
```

### Fluxo completo solicitado e ainda pendente

```text
Rascunho -> Solicitada -> Aprovada
        |             -> Rejeitada
        |             -> Ajustes solicitados -> Rascunho
        -> Cancelada
```

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
| RT06 | Validação contínua | GitHub Actions para backend e frontend |
