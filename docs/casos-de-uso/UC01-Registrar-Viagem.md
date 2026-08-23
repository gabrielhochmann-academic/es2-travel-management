# UC01 — Registrar viagem

| Campo | Descrição |
|---|---|
| Objetivo | Permitir que um colaborador registre o planejamento de uma viagem no SGV. |
| Ator principal | Colaborador |
| Prioridade | Alta — RF01 Planejamento de Viagem |
| Estado | Exemplo de caso de uso para a Sprint 0; sujeito ao refinamento com o Product Owner. |

## 1. Requisitos especiais

- O destino e o motivo são obrigatórios.
- A data de retorno deve ser igual ou posterior à data de saída.
- A viagem deve ser criada em situação **Rascunho**.
- O responsável deve ser o usuário que realizou o cadastro.

## 2. Pré-condições

- O colaborador possui acesso à interface do SGV.
- O sistema está disponível para registrar dados de demonstração ou dados persistidos no PostgreSQL.

## 3. Fluxo principal

1. O colaborador seleciona a opção **Nova viagem**.
2. O sistema apresenta os campos destino, data de saída, data de retorno, motivo e meio de transporte.
3. O colaborador informa os dados do planejamento.
4. O colaborador confirma o registro.
5. O sistema valida os campos obrigatórios e o período informado.
6. O sistema cria a viagem com situação **Rascunho** e associa o colaborador como responsável.
7. O sistema apresenta a viagem na lista de acompanhamentos.

## 4. Fluxos alternativos e exceções

| Código | Condição | Resposta do sistema |
|---|---|---|
| E01 | Destino não informado | Exibe mensagem informando que o destino é obrigatório e mantém o formulário disponível. |
| E02 | Motivo não informado | Exibe mensagem informando que o motivo é obrigatório e mantém o formulário disponível. |
| E03 | Data de retorno anterior à data de saída | Exibe mensagem de inconsistência no período e impede o registro. |
| E04 | Persistência indisponível | Exibe mensagem de falha e não confirma o registro como concluído. |

## 5. Dados envolvidos

| Dado | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| Destino | Texto | Sim | Identifica o local principal da viagem. |
| Data de saída | Data | Sim | Não pode ser posterior à data de retorno. |
| Data de retorno | Data | Sim | Deve ser igual ou posterior à data de saída. |
| Motivo | Texto | Sim | Identifica a finalidade corporativa da viagem. |
| Meio de transporte | Texto | Sim | Exemplo: terrestre, aéreo ou outro. |
| Responsável | Referência de usuário | Sim | É o usuário que realizou o cadastro. |
| Situação | Enum | Sim | Inicia em Rascunho. |

## 6. Pós-condições

- A viagem fica disponível para consulta e alteração enquanto ainda não tiver sido aprovada.
- A viagem pode ser submetida posteriormente para análise do gestor.
- A criação deve gerar uma evidência rastreável no banco de dados e, quando aplicável, no histórico da viagem.

## 7. Proposta de interface

A tela deve expor um formulário de criação com os campos do planejamento, mensagens de validação e indicação clara de que o registro será salvo como **Rascunho**. O demonstrador React possui essa tela para ilustrar o fluxo.

## 8. Diagrama relacionado

![Diagrama de caso de uso do SGV](diagrama-caso-de-uso.png)

A fonte editável do diagrama está em [diagrama-caso-de-uso.puml](diagrama-caso-de-uso.puml).
