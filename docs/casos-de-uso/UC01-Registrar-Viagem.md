# UC01 — Registrar viagem

| Campo | Descrição |
|---|---|
| Ator principal | Colaborador |
| Objetivo | Registrar uma viagem corporativa em situação de rascunho. |
| Prioridade | Alta |

## Pré-condições

- O sistema está disponível para registro de viagens.
- O colaborador possui os dados necessários para o planejamento da viagem.

## Fluxo principal

1. O colaborador seleciona a opção **Nova viagem**.
2. O sistema apresenta o formulário de cadastro.
3. O colaborador informa destino, data de saída, data de retorno, motivo, meio de transporte e responsável.
4. O colaborador confirma o registro.
5. O sistema valida os dados informados.
6. O sistema cria a viagem com situação **Rascunho**.
7. O sistema apresenta a viagem registrada para consulta.

## Fluxos alternativos

| Código | Condição | Resposta do sistema |
|---|---|---|
| FA01 | Campo obrigatório não informado | Informa os campos que precisam ser preenchidos. |
| FA02 | Data de retorno anterior à data de saída | Informa que o período da viagem é inválido. |
| FA03 | Falha ao registrar os dados | Informa que o cadastro não foi concluído. |

## Pós-condições

- A viagem é armazenada com situação **Rascunho**.
- A viagem fica disponível para consulta e posterior submissão para análise.

## Casos de uso relacionados

| Código | Caso de uso | Ator principal | Relação com UC01 |
|---|---|---|---|
| UC02 | Consultar viagem | Colaborador | Permite visualizar uma viagem registrada. |
| UC03 | Submeter viagem para análise | Colaborador | Altera a situação de Rascunho para Solicitada. |
| UC04 | Decidir solicitação de viagem | Gestor | Aprova ou rejeita uma viagem submetida. |

## Dados do cadastro

| Dado | Obrigatório |
|---|---:|
| Destino | Sim |
| Data de saída | Sim |
| Data de retorno | Sim |
| Motivo | Sim |
| Meio de transporte | Sim |
| Responsável | Sim |

## Diagrama do exemplo técnico

![Diagrama de caso de uso UC01](diagrama-caso-de-uso.png)

O diagrama apresenta somente os quatro casos de uso expostos pelo exemplo técnico. A fonte editável está em [diagrama-caso-de-uso.puml](diagrama-caso-de-uso.puml).
