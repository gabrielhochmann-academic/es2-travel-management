# UC01 - Registrar viagem

| Elemento | Definição |
|---|---|
| **Ator principal** | Colaborador cadastrado |
| **Objetivo** | Registrar uma viagem na situação Rascunho |
| **Prioridade** | Alta |

## Pré-condições

1. O SGV está disponível.
2. O empregado possui matrícula, cargo e área cadastrados.

## Fluxo principal

| Etapa | Ação | Resultado |
|---|---|---|
| 1 | O colaborador seleciona **Nova viagem**. | O formulário é apresentado. |
| 2 | O colaborador seleciona seu cadastro. | Matrícula, cargo e área são associados à viagem. |
| 3 | O colaborador informa destino, período, motivo e transporte. | Os dados ficam prontos para validação. |
| 4 | O colaborador confirma o registro. | A API valida e persiste a viagem. |
| 5 | O sistema gera o número da viagem. | O registro recebe o formato `VG-00000`. |
| 6 | O sistema cria a situação Rascunho. | A primeira entrada do histórico é registrada. |
| 7 | O sistema apresenta a viagem. | O colaborador pode editar, cancelar ou submeter. |

## Exceções

| Código | Situação | Resposta do sistema |
|---|---|---|
| FA01 | Campo obrigatório ausente | Recusar o cadastro e indicar o erro. |
| FA02 | Retorno anterior à saída | Informar que o período é inválido. |
| FA03 | Empregado não cadastrado | Recusar o vínculo. |
| FA04 | Falha de persistência | Informar que o cadastro não foi concluído. |

## Resultado

A viagem é persistida como Rascunho e fica disponível para edição, cancelamento ou submissão.

```text
Cadastro -> Rascunho -> edição, cancelamento ou submissão
```

## Dados obrigatórios

| Dado | Origem |
|---|---|
| Empregado | Cadastro de empregados |
| Destino | Formulário da viagem |
| Data de saída | Formulário da viagem |
| Data de retorno | Formulário da viagem |
| Motivo | Formulário da viagem |
| Meio de transporte | Formulário da viagem |

![Diagrama de caso de uso UC01](diagrama-caso-de-uso.png)
