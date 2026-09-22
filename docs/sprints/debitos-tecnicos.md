# Débitos técnicos do SGV

Este registro consolida os débitos técnicos identificados no projeto, sua classificação, o impacto de mantê-los, o esforço necessário e a definição de pronto. Cada item possui uma tarefa correspondente no Jira e foi resolvido ou rastreado na entrega final.

| Jira | Débito | Classificação | Esforço | Situação |
|---|---|---|---|---|
| [ES2-50](https://gabrielhochmann.atlassian.net/browse/ES2-50) | Integração da tela principal com a API | Inadvertido e imprudente | Grande | Concluído |
| [ES2-51](https://gabrielhochmann.atlassian.net/browse/ES2-51) | Fluxo completo de aprovação | Deliberado e prudente | Grande | Concluído |
| [ES2-52](https://gabrielhochmann.atlassian.net/browse/ES2-52) | Empregados, cargos, áreas e histórico | Deliberado e prudente | Grande | Concluído |
| [ES2-53](https://gabrielhochmann.atlassian.net/browse/ES2-53) | Baselines e anotações das tags | Inadvertido e imprudente | Pequeno | Concluído |
| [ES2-54](https://gabrielhochmann.atlassian.net/browse/ES2-54) | Ampliação dos testes automatizados | Deliberado e prudente | Médio | Concluído |

## ES2-50: integração da tela principal com a API

**Descrição:** substituir o estado local da tela principal por operações reais na API de viagens.

**Juros:** enquanto o débito permanecia, os dados exibidos podiam divergir do PostgreSQL e as ações não eram persistidas.

**Classificação:** inadvertido e imprudente. A limitação não foi planejada e afetava diretamente o comportamento esperado do sistema.

**Definição de pronto:** cadastro, listagem, edição, submissão, cancelamento e decisão usam a API; erros são exibidos; os fluxos são validados.

## ES2-51: fluxo completo de aprovação

**Descrição:** implementar cancelamento, solicitação de ajustes, edição, ressubmissão e histórico de situações.

**Juros:** o processo ficava incompleto e sem rastreabilidade suficiente das mudanças de estado.

**Classificação:** deliberado e prudente. A implementação foi adiada para priorizar a preparação inicial, mantendo o risco conhecido e rastreado.

**Definição de pronto:** os estados possuem transições válidas; cada mudança registra data, responsável, situação e justificativa quando aplicável; as regras são testadas.

## ES2-52: empregados, cargos, áreas e histórico

**Descrição:** substituir o nome livre do responsável por cadastros organizacionais e histórico de cargo e área.

**Juros:** não era possível validar o perfil Gestor nem preservar o contexto organizacional do empregado no momento da solicitação.

**Classificação:** deliberado e prudente. O cadastro foi deixado para uma evolução posterior, com o risco identificado e vinculado aos requisitos da sprint seguinte.

**Definição de pronto:** matrícula validada; cargos Colaborador e Gestor; áreas cadastráveis; viagens vinculadas a empregados; histórico funcional preservado por período.

## ES2-53: baselines e anotações das tags

**Descrição:** revisar as referências das tags das sprints e garantir que representem commits integrados e recuperáveis.

**Juros:** a recuperação de uma sprint poderia produzir uma versão diferente da descrita na documentação.

**Classificação:** inadvertido e imprudente. A inconsistência não foi planejada e comprometia a rastreabilidade histórica.

**Definição de pronto:** tags seguem o padrão `sprint-<número>`, apontam para a linha integrada e possuem marco de débito técnico final no Git.

## ES2-54: testes automatizados

**Descrição:** ampliar a cobertura das regras de viagem, empregados, áreas, cargos, custos e indicadores.

**Juros:** regressões poderiam chegar à linha principal sem detecção suficiente, aumentando o custo de correção.

**Classificação:** deliberado e prudente. A cobertura foi ampliada progressivamente, com o risco acompanhado no Jira.

**Definição de pronto:** testes unitários das regras principais executam com sucesso e o build do frontend é validado.

## Evidência final

A entrega final está integrada na `main`. A tag `techical-debt` preserva a grafia exigida no enunciado e aponta para o commit que consolida a documentação e a rastreabilidade dos débitos.
