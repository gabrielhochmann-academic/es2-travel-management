# UC00 | Cadastrar empregado

| Elemento | Definição |
|---|---|
| Ator principal | Colaborador |
| Objetivo | Registrar um empregado para que ele possa ser associado ao planejamento de uma viagem. |
| Prioridade | Alta |
| Pré-condição | O SGV está disponível para operação. |
| Pós-condição | O empregado fica disponível para consulta e seleção no cadastro de viagem. |

## Fluxo principal

| Etapa | Ação | Resultado esperado |
|---|---|---|
| 1 | O colaborador seleciona a opção de cadastrar empregado. | O sistema apresenta o formulário de empregado. |
| 2 | O colaborador informa matrícula, nome e área. | Os dados necessários ficam disponíveis para validação. |
| 3 | O colaborador confirma o cadastro. | O sistema verifica os campos obrigatórios e a unicidade da matrícula. |
| 4 | O sistema armazena o empregado. | O empregado pode ser selecionado no planejamento de viagem. |

## Fluxos alternativos

| Código | Situação | Resposta do sistema |
|---|---|---|
| FA01 | Algum campo obrigatório não foi informado. | O sistema impede a conclusão e solicita o preenchimento. |
| FA02 | A matrícula já pertence a outro empregado. | O sistema informa que a matrícula deve ser única. |

## Dados necessários

| Dado | Obrigatório | Regra |
|---|---:|---|
| Matrícula | Sim | Deve identificar unicamente o empregado. |
| Nome | Sim | Deve identificar o empregado associado à viagem. |
| Área | Sim | Deve registrar a unidade organizacional do empregado. |
