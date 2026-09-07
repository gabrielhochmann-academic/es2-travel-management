# Sprint 1 — User Stories

## User Stories
 
### US01 — Iniciar cadastro da viagem

**Como** colaborador,  
**quero** iniciar o cadastro de uma nova viagem,  
**para** registrar uma viagem corporativa no sistema.

**Critérios de aceitação:**
- Deve existir a opção **“Nova viagem”**.
- Ao selecionar essa opção, o sistema deve apresentar o formulário de cadastro da viagem.

---

### US02 — Preencher dados da viagem

**Como** colaborador,  
**quero** informar os dados da viagem,  
**para** registrar as informações necessárias para o planejamento.

**Critérios de aceitação:**
- Deve ser possível selecionar um empregado cadastrado.
- Deve ser possível informar o destino.
- Deve ser possível informar a data de saída.
- Deve ser possível informar a data de retorno.
- Deve ser possível informar o motivo da viagem.
- Deve ser possível informar o meio de transporte.
- Os dados necessários para o cadastro devem ser obrigatórios.

---

### US03 — Validar cadastro da viagem

**Como** colaborador,  
**quero** que os dados informados sejam validados no cadastro,  
**para** garantir que a viagem seja registrada com informações válidas.

**Critérios de aceitação:**
- O sistema deve impedir o cadastro quando houver algum campo obrigatório não preenchido.
- O sistema deve verificar se o empregado selecionado está cadastrado e disponível.
- O sistema deve impedir o cadastro quando a data de retorno for anterior à data de saída.
- O sistema deve informar ao colaborador o motivo pelo qual o cadastro não pode ser concluído.
