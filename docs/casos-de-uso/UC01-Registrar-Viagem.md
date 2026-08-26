# UC01 | Registrar viagem

| Elemento | Definição |
|---|---|
| Ator principal | Colaborador |
| Objetivo | Registrar uma viagem corporativa na situação inicial de Rascunho. |
| Prioridade | Alta |
| Pré-condições | O SGV está disponível e há pelo menos um empregado cadastrado. |
| Pós-condição | Uma viagem com número único fica associada a um empregado e disponível para consulta. |

## Fluxo principal

| Etapa | Ação | Resultado esperado |
|---|---|---|
| 1 | O colaborador seleciona Nova viagem. | O sistema apresenta o formulário de planejamento. |
| 2 | O colaborador seleciona um empregado cadastrado. | O vínculo do empregado fica definido para a viagem. |
| 3 | O colaborador informa destino, datas, motivo e meio de transporte. | Os dados obrigatórios do planejamento ficam preenchidos. |
| 4 | O colaborador confirma o registro. | O sistema recebe a solicitação para validação. |
| 5 | O sistema valida os campos, o empregado e o período informado. | Somente dados válidos seguem para persistência. |
| 6 | O sistema gera o número da viagem e a armazena como Rascunho. | A viagem fica vinculada ao empregado. |
| 7 | O sistema apresenta a viagem registrada. | O colaborador pode consultar ou submeter o rascunho para análise. |

## Fluxos alternativos

| Código | Situação | Resposta do sistema |
|---|---|---|
| FA01 | Há campo obrigatório ausente. | O sistema impede a conclusão e solicita o preenchimento. |
| FA02 | A data de retorno é anterior à data de saída. | O sistema informa que o período é inválido. |
| FA03 | O empregado selecionado não existe ou não está disponível. | O sistema impede o registro e solicita a seleção de um empregado cadastrado. |
| FA04 | Ocorre falha de persistência. | O sistema informa que o cadastro não foi concluído. |

## Dados necessários

| Dado | Obrigatório | Origem |
|---|---:|---|
| Número da viagem | Sim | Gerado pelo sistema. |
| Destino | Sim | Informado pelo colaborador. |
| Data de saída | Sim | Informada pelo colaborador. |
| Data de retorno | Sim | Informada pelo colaborador e validada pelo sistema. |
| Motivo | Sim | Informado pelo colaborador. |
| Meio de transporte | Sim | Informado pelo colaborador. |
| Situação | Sim | Definida pelo sistema como Rascunho. |
| Empregado | Sim | Selecionado a partir do cadastro de empregados. |

## Casos relacionados

| Código | Caso de uso | Continuidade |
|---|---|---|
| UC00 | Cadastrar empregado | Disponibiliza o empregado para seleção. |
| UC02 | Consultar viagem | Permite revisar uma viagem registrada. |
| UC03 | Submeter viagem para análise | Altera Rascunho para Solicitada. |
| UC04 | Decidir solicitação de viagem | Aprova ou rejeita uma viagem submetida. |

## Diagrama

![Diagrama de casos de uso](diagrama-caso-de-uso.png)

A fonte editável está disponível em [diagrama-caso-de-uso.puml](diagrama-caso-de-uso.puml).
