# UC03 - Informar custo da viagem

> **Jornada priorizada:** permitir que o colaborador registre o custo associado à viagem, mantendo a solicitação organizada e com suas informações financeiras disponíveis para consulta.

| Elemento | Definição |
|---|---|
| **Ator principal** | Colaborador |
| **Objetivo** | Informar o custo de uma viagem e manter esse valor associado à solicitação. |
| **Prioridade** | Alta |
| **Valor entregue** | O colaborador passa a ter o custo da viagem registrado, permitindo seu acompanhamento e visualização no painel de custos. |

---

## Contexto da jornada

A informação do custo complementa o registro da viagem no SGV. Nesta etapa, o colaborador informa o valor associado à viagem e o sistema valida e armazena essa informação para que ela possa ser consultada posteriormente.

> **Informação registrada:** o custo informado permanece associado à respectiva viagem e pode ser apresentado juntamente com os demais dados da solicitação.

> **Objetivo da Sprint 3:** disponibilizar o registro do custo das viagens e sua visualização por meio do painel de custos.

---

## Pré-condições

| Condição | Responsável |
|---|---|
| O SGV está disponível para o gerenciamento de viagens. | Sistema |
| A viagem está cadastrada no sistema. | Colaborador |
| O colaborador possui o valor correspondente ao custo da viagem. | Colaborador |

---

## Fluxo principal

| Etapa | Ação | Resultado esperado |
|---|---|---|
| **1** | O colaborador acessa uma viagem cadastrada. | O sistema apresenta as informações da viagem. |
| **2** | O colaborador informa o custo da viagem. | O valor é preenchido no campo correspondente. |
| **3** | O colaborador confirma a informação. | O sistema recebe o custo para validação. |
| **4** | O sistema valida o valor informado. | O custo é conferido conforme as regras de negócio. |
| **5** | O sistema associa o custo à viagem. | O valor fica vinculado à respectiva solicitação. |
| **6** | O sistema armazena a informação. | O custo passa a fazer parte dos dados persistidos da viagem. |
| **7** | O sistema apresenta a viagem atualizada. | O colaborador pode consultar o custo registrado. |

---

## Tratamento de exceções

| Código | Situação identificada | Resposta esperada do sistema |
|---|---|---|
| **FA01** | O custo não foi informado quando necessário. | Solicitar o preenchimento do valor antes da conclusão. |
| **FA02** | O valor informado possui formato inválido. | Informar que o custo deve ser preenchido em um formato válido. |
| **FA03** | Ocorre uma falha ao armazenar o custo. | Informar que a atualização não foi concluída e preservar uma comunicação clara ao usuário. |

---

## Resultado da jornada

Após o fluxo principal, o custo é associado à viagem e fica disponível para consulta. O valor também pode ser utilizado pelo painel de custos para apresentar as informações financeiras das viagens cadastradas.

```text
Custo informado → Validação → Custo associado à viagem → Consulta no painel de custos
