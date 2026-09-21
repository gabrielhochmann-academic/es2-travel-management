# Sprint 2 - User Stories 

## User Stories

### US01 : Criar viagem como rascunho

**Como** empregado,  
**quero** criar uma viagem inicialmente como Rascunho,  
**para** poder revisar suas informações antes de solicitar a análise.

**Critérios de aceitação:**

- Ao criar, o status da viagem deve ser **Rascunho**.
- O solicitante deve poder solicitar a viagem.
- O solicitante deve poder cancelar a viagem enquanto ela estiver em Rascunho.

---

### US02 : Solicitar viagem

**Como** empregado solicitante,  
**quero** enviar minha viagem para análise,  
**para** que um gestor possa avaliá-la.

**Critérios de aceitação:**

- Ao solicitar, o status da viagem deve mudar de **Rascunho** para **Solicitada**.
- Após a solicitação, o empregado não deve mais poder editar a viagem.
- O cargo e a área vigentes do empregado devem ser registrados no momento da solicitação.

---

### US03 : Cancelar viagem

**Como** empregado solicitante,  
**quero** cancelar uma viagem em Rascunho,  
**para** encerrar uma solicitação que não será realizada.

**Critérios de aceitação:**

- Somente o solicitante da viagem deve poder cancelá-la.
- Somente viagens com status **Rascunho** podem ser canceladas.
- Ao cancelar, o status da viagem deve mudar para **Cancelada**.
- Após o cancelamento, o fluxo da viagem deve ser encerrado.

---

### US04 : Analisar viagem

**Como** gestor,  
**quero** visualizar viagens Solicitadas,  
**para** decidir sobre cada solicitação.

**Critérios de aceitação:**

- As viagens com status **Solicitada** devem aparecer para análise do gestor.
- O gestor deve conseguir visualizar as informações necessárias para tomar uma decisão.
- Empregados que não possuem perfil de gestor não devem poder executar decisões de aprovação.

---

### US05 : Aprovar viagem

**Como** gestor,  
**quero** aprovar uma viagem,  
**para** autorizar sua realização.

**Critérios de aceitação:**

- Somente usuários com cargo **GESTOR** podem aprovar uma viagem.
- A viagem deve estar com status **Solicitada**.
- Ao aprovar, o status deve mudar para **Aprovada**.
- Após a aprovação, o fluxo da viagem deve ser encerrado.
- A decisão de aprovação deve ser registrada no histórico da viagem.

---

### US06 : Rejeitar viagem

**Como** gestor,  
**quero** rejeitar uma viagem informando uma justificativa,  
**para** registrar o motivo da decisão.

**Critérios de aceitação:**

- Somente usuários com cargo **GESTOR** podem rejeitar uma viagem.
- A viagem deve estar com status **Solicitada**.
- A justificativa da rejeição deve ser obrigatória.
- Ao rejeitar, o status deve mudar para **Rejeitada**.
- Após a rejeição, o fluxo da viagem deve ser encerrado.
- A decisão e sua justificativa devem ser registradas no histórico.

---

### US07 : Solicitar ajustes

**Como** gestor,  
**quero** devolver uma viagem com uma descrição dos ajustes necessários,  
**para** que o solicitante corrija as informações.

**Critérios de aceitação:**

- Somente usuários com cargo **GESTOR** podem solicitar ajustes.
- A viagem deve estar com status **Solicitada**.
- A descrição dos ajustes necessários deve ser obrigatória.
- Ao solicitar ajustes, o status deve mudar para **Ajustes solicitados**.
- A viagem deve retornar para o solicitante realizar as correções.

---

### US08 : Corrigir viagem

**Como** empregado solicitante,  
**quero** editar uma viagem devolvida para ajustes,  
**para** corrigir os dados apontados pelo gestor.

**Critérios de aceitação:**

- A edição da viagem deve estar disponível somente quando o status for **Ajustes solicitados**.
- Somente o solicitante da viagem deve poder realizar as alterações.
- O empregado deve conseguir corrigir os dados indicados pelo gestor.
- Após realizar as correções, o solicitante deve poder submeter novamente a viagem.

---

### US09 : Resubmeter viagem

**Como** empregado solicitante,  
**quero** submeter novamente a viagem corrigida,  
**para** que ela volte à análise do gestor.

**Critérios de aceitação:**

- Ao resubmeter, o status deve mudar de **Ajustes solicitados** para **Solicitada**.
- O cargo e a área atuais do empregado devem ser registrados para a nova solicitação.
- Um novo evento deve ser registrado no histórico de status da viagem.
- Após a resubmissão, o solicitante não deve mais poder editar a viagem.

---

### US10 : Consultar histórico da viagem

**Como** usuário do sistema,  
**quero** consultar o histórico de status da viagem,  
**para** saber quando e por quem cada mudança ocorreu.

**Critérios de aceitação:**

- Cada evento do histórico deve possuir uma data.
- Cada evento deve identificar o responsável pela alteração.
- Cada evento deve informar o status correspondente.
- Rejeições devem poder apresentar suas justificativas.
- Solicitações de ajustes devem poder apresentar suas justificativas.

---

### US11 : Manter histórico do empregado

**Como** responsável pelo cadastro,  
**quero** preservar as alterações de cargo e área do empregado,  
**para** manter o contexto histórico das solicitações.

**Critérios de aceitação:**

- O histórico do empregado deve registrar cargo, área e período de vigência.
- Uma alteração de cargo ou área deve gerar um novo período.
- Os períodos anteriores devem permanecer armazenados.
- O histórico não deve ser apagado quando houver uma alteração cadastral.

---

### US12 : Cadastrar empregado

**Como** responsável pelo cadastro,  
**quero** cadastrar empregados com matrícula, nome, cargo e área,  
**para** identificá-los no fluxo de viagens.

**Critérios de aceitação:**

- A matrícula deve seguir o formato **XXXX-X**.
- O cargo deve ser **COLABORADOR** ou **GESTOR**.
- A área deve ser vinculada ao empregado.
- Os dados obrigatórios devem ser informados para concluir o cadastro.

---

### US13 : Cadastrar cargo

**Como** responsável pelo cadastro,  
**quero** manter os cargos permitidos,  
**para** definir quem pode atuar como gestor.

**Critérios de aceitação:**

- Os cargos permitidos devem ser **COLABORADOR** e **GESTOR**.
- O sistema deve permitir a utilização dos cargos cadastrados no cadastro de empregados.
- O cargo **GESTOR** deve determinar quem pode executar ações de análise e decisão sobre viagens.

---

### US14 : Cadastrar área

**Como** responsável pelo cadastro,  
**quero** cadastrar áreas,  
**para** vincular empregados às suas áreas organizacionais.

**Critérios de aceitação:**

- Uma área deve poder ser vinculada a empregados.
- O empregado deve possuir uma área definida.
- Alterações de área devem ser preservadas no histórico do empregado.
- Os períodos anteriores de vinculação devem permanecer armazenados.