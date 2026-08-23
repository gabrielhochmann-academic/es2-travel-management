# Como contribuir

Este repositório é utilizado em um trabalho acadêmico de Engenharia de Software II. As contribuições devem refletir trabalho real, preservar a rastreabilidade com o Jira e respeitar o escopo definido para cada Sprint.

## Antes de começar

1. Verifique se existe uma issue correspondente no projeto **ES2** do Jira.
2. Leia a descrição, o escopo e os critérios de aceite disponíveis.
3. Confirme se o item foi selecionado para a Sprint atual ou se permanece no backlog.
4. Evite iniciar requisitos que ainda estejam marcados como pendentes de refinamento.

## Convenções de branch e commit

Utilize a chave da issue quando ela representar uma atividade real.

| Tipo de alteração | Exemplo de branch | Exemplo de commit |
|---|---|---|
| Documentação | `docs/ES2-4-modelo-documento-visao` | `ES2-4 docs: add vision document model` |
| Funcionalidade | `feature/ES2-13-inserir-viagem` | `ES2-13 feat: add trip creation` |
| Correção | `fix/ES2-18-validar-datas-viagem` | `ES2-18 fix: validate trip dates` |
| Manutenção | `chore/ES2-7-containerizacao-exemplo` | `ES2-7 chore: add example containers` |

A chave do Jira não deve ser usada para simular atividade. Ela deve aparecer somente quando o commit, branch ou pull request estiver efetivamente relacionado à issue.

## Pull requests

Antes de abrir uma pull request, confirme que:

- o escopo está vinculado a uma issue real;
- a documentação foi atualizada quando aplicável;
- não há credenciais, dados pessoais ou arquivos locais incluídos;
- os testes disponíveis foram executados e o resultado é descrito;
- a issue no Jira receberá o link da evidência após a revisão.

## Evidências e status no Jira

Uma issue não deve ser movida para **Concluído** somente porque uma tarefa foi iniciada. Antes da transição, registre uma evidência verificável: arquivo, commit, pull request, teste, checklist ou link técnico pertinente.

## Privacidade e integridade acadêmica

O projeto deve permanecer privado. Não inclua trabalhos de outras disciplinas, dados pessoais, chaves, tokens, arquivos de ambiente ou conteúdo produzido por terceiros sem a devida atribuição. A autoria e a divisão de trabalho devem refletir o histórico real do repositório e do Jira.
