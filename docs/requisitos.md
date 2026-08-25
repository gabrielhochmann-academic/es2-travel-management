# Requisitos do Produto - SGV

> **Propósito:** transformar o controle de viagens corporativas em um fluxo único, rastreável e fácil de acompanhar por colaboradores e gestores.

## Contexto e objetivo

O **Sistema de Gestão de Viagens (SGV)** organiza o registro e o acompanhamento de viagens corporativas. Nesta etapa, o produto concentra-se no ciclo essencial de uma solicitação: a viagem é planejada, registrada como rascunho, submetida à análise e decidida pelo gestor.

> **Resultado esperado:** reduzir informações dispersas e tornar a situação de cada viagem clara para quem solicita, analisa e acompanha o processo.

## Estado atual da Sprint 0

Os requisitos deste documento representam a direção do produto e não devem ser interpretados como lista completa de funcionalidades já integradas na interface. Na Sprint 0, a API disponibiliza o cadastro, a consulta, a submissão e a decisão de viagens; a interface React ainda demonstra o fluxo com estado local. O controle de despesas, a separação de perfis e a integração frontend-API permanecem como evoluções planejadas.

---

## Escopo do exemplo técnico

| Incluído | Não contemplado nesta etapa |
|---|---|
| Registro de viagem com destino, período, motivo, transporte e responsável. | Integrações com ERP, sistemas de passagens, pagamento eletrônico e autenticação corporativa. |
| Consulta de viagens registradas. | Automação de despesas, pagamentos ou reservas externas. |
| Fluxo de Rascunho, Solicitada, Aprovada e Rejeitada. | Módulos adicionais além do fluxo acadêmico priorizado. |

---

## Requisitos funcionais

| Código | Capacidade do produto | Critério de entendimento |
|---|---|---|
| **RF01** | Registrar viagem | O sistema permite informar destino, período, motivo, meio de transporte e responsável. |
| **RF02** | Iniciar como rascunho | Toda viagem recém-registrada recebe a situação **Rascunho**. |
| **RF03** | Consultar viagens | O sistema permite visualizar as viagens registradas. |
| **RF04** | Submeter para análise | Uma viagem em rascunho pode ser encaminhada para decisão. |
| **RF05** | Decidir solicitação | Uma viagem submetida pode ser aprovada ou rejeitada por um gestor. |

---

## Regras de negócio

| Código | Regra | Impacto para o usuário |
|---|---|---|
| **RN01** | Destino, período, motivo, meio de transporte e responsável são obrigatórios. | O registro só é concluído com os dados essenciais da viagem. |
| **RN02** | A data de retorno deve ser igual ou posterior à data de saída. | O período informado deve ser válido. |
| **RN03** | O registro inicial possui a situação **Rascunho**. | A viagem ainda pode ser revisada antes da análise. |
| **RN04** | Somente viagens em rascunho podem ser submetidas. | O fluxo mantém uma ordem clara de transições. |
| **RN05** | Somente viagens submetidas podem ser aprovadas ou rejeitadas. | A decisão ocorre somente após o encaminhamento formal. |
| **RN06** | A rejeição exige justificativa. | O solicitante recebe contexto para uma eventual revisão. |

---

## Restrições técnicas

| Código | Diretriz | Decisão adotada |
|---|---|---|
| **RT01** | Interface web | React e TypeScript. |
| **RT02** | API de negócio | Spring Boot com Java 21. |
| **RT03** | Persistência | PostgreSQL. |
| **RT04** | Execução local integrada | Docker Compose. |

---

## Fluxo de situação da viagem

```text
Rascunho → Solicitada → Aprovada
                    └→ Rejeitada
```

| Situação | Significado |
|---|---|
| **Rascunho** | Viagem registrada e ainda passível de ajuste pelo colaborador. |
| **Solicitada** | Viagem encaminhada para análise do gestor. |
| **Aprovada** | Solicitação aceita e apta a receber despesas no escopo do produto. |
| **Rejeitada** | Solicitação não aprovada; a decisão exige justificativa. |

---

## Referência do escopo

O exemplo técnico da Sprint 0 prioriza o cadastro de viagens e o ciclo de situação descrito acima. A evolução de módulos adicionais será orientada pelo planejamento do produto e pelas próximas sprints.
