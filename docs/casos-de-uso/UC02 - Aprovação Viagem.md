# Diagrama de Casos de Uso : SGV

## Atores

| Ator                       | Responsabilidade                                   |
| -------------------------- | -------------------------------------------------- |
| **Empregado**              | Solicita, cancela e corrige suas próprias viagens. |
| **Gestor**                 | Analisa e decide sobre viagens solicitadas.        |
| **Administrador/Cadastro** | Mantém empregados, cargos e áreas.                 |

---

## Diagrama

```mermaid
flowchart LR

    E[Empregado]

    G[Gestor]

    A[Administrador / Cadastro]

    UC1((Criar viagem))

    UC2((Solicitar viagem))

    UC3((Cancelar viagem))

    UC4((Editar viagem devolvida))

    UC5((Submeter novamente))

    UC6((Consultar viagem para análise))

    UC7((Aprovar viagem))

    UC8((Rejeitar viagem))

    UC9((Solicitar ajustes))

    UC10((Registrar histórico de status))

    UC11((Registrar histórico do empregado))

    UC12((Cadastrar empregado))

    UC13((Cadastrar cargo))

    UC14((Cadastrar área))

    E --- UC1

    E --- UC2

    E --- UC3

    E --- UC4

    E --- UC5

    G --- UC6

    G --- UC7

    G --- UC8

    G --- UC9

    A --- UC12

    A --- UC13

    A --- UC14

    UC2 -.->|registra| UC10

    UC3 -.->|registra| UC10

    UC7 -.->|registra| UC10

    UC8 -.->|registra| UC10

    UC9 -.->|registra| UC10

    UC2 -.->|captura cargo e área| UC11

    UC12 -.->|mantém alterações| UC11
```

---

## Observação

O histórico de status é consequência das operações de mudança de status. O histórico do empregado é mantido quando cargo ou área são alterados e é consultado para preservar o contexto profissional da solicitação.
