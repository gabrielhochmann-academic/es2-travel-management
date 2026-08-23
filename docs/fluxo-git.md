# Fluxo de Git e Estratégia de Branches

O projeto adota um fluxo acadêmico baseado em branches de integração, funcionalidades e releases. O objetivo é manter o código demonstrável, preservar o histórico real de contribuições e permitir relacionar alterações às issues do Jira.

## Branches permanentes

| Branch | Finalidade | Regra de uso |
|---|---|---|
| `main` | Versão estável e demonstrável do projeto. | Recebe somente integrações revisadas de releases ou correções críticas. Não é usada para desenvolvimento direto. |
| `develop` | Linha de integração do desenvolvimento da próxima entrega. | Recebe pull requests de branches `feature/*` revisadas e testadas. |

## Branches de funcionalidades

As branches abaixo atendem à nomenclatura indicada para o projeto. Elas partem de `develop` e retornam para `develop` por pull request após revisão.

| Branch | Escopo inicial | Issues Jira relacionadas |
|---|---|---|
| `feature/planejar-viagem` | Cadastro, consulta, alteração e exclusão de viagens, conforme refinamento de RF01. | ES2-13 a ES2-16 e itens complementares de planejamento. |
| `feature/registrar-despesas` | Registro, consulta e consolidação de despesas de viagens aprovadas. | Stories do Epic ES2-11. |
| `feature/aprovar-viagem` | Submissão, aprovação, rejeição e histórico de situação. | Stories do Epic ES2-10. |
| `feature/dashboard` | Indicadores e painéis de informações gerenciais. | Stories do Epic ES2-12. |

O nome da branch permanece conforme a convenção solicitada. A chave do Jira deve ser incluída no commit e no título da pull request quando o trabalho estiver vinculado a uma issue real.

## Branches de release

| Branch | Quando criar | Finalidade |
|---|---|---|
| `release/1.0.0` | Quando o conjunto de planejamento selecionado para a primeira entrega estiver integrado e pronto para estabilização. | Validar, corrigir e preparar a primeira versão demonstrável. |
| `release/2.0.0` | Quando o segundo conjunto de funcionalidades estiver integrado e pronto para estabilização. | Validar, corrigir e preparar a segunda versão demonstrável. |

Branches de release **não devem ser abertas antecipadamente** sem conteúdo integrado. Elas representam uma etapa real de estabilização, não um marcador de planejamento.

## Fluxo de trabalho

```text
main
 └── develop
      ├── feature/planejar-viagem
      ├── feature/registrar-despesas
      ├── feature/aprovar-viagem
      └── feature/dashboard

release/1.0.0  ← criada a partir de develop quando a primeira versão estiver pronta
release/2.0.0  ← criada a partir de develop quando a segunda versão estiver pronta
```

1. Crie ou consulte a issue do Jira antes de iniciar uma funcionalidade.
2. Atualize a branch correspondente a partir de `develop`.
3. Realize commits pequenos, coerentes e rastreáveis.
4. Abra pull request para `develop`, descrevendo a entrega e os testes realizados.
5. Após revisão e integração, vincule a evidência à issue do Jira.
6. Quando um conjunto de funcionalidades estiver estabilizado, crie a branch de release a partir de `develop`.
7. Após a validação da release, integre o resultado em `main` e registre a versão entregue.

## Convenções de commit e pull request

| Elemento | Convenção | Exemplo |
|---|---|---|
| Commit de funcionalidade | `<ISSUE> feat: <descrição>` | `ES2-13 feat: add trip creation form` |
| Commit de documentação | `<ISSUE> docs: <descrição>` | `ES2-4 docs: add vision document model` |
| Commit de correção | `<ISSUE> fix: <descrição>` | `ES2-18 fix: validate return date` |
| Título de pull request | `<ISSUE> <descrição objetiva>` | `ES2-13 Implementa cadastro de viagem` |

Não crie commits vazios, pull requests artificiais ou branches sem finalidade técnica apenas para aparentar progresso. A rastreabilidade deve refletir o trabalho realizado.

## Regras de proteção recomendadas

Quando as permissões administrativas estiverem disponíveis, `main` e `develop` devem exigir pull request antes da integração. A `main` deve exigir revisão aprovada e checagens de qualidade configuradas quando elas existirem. Essas proteções não substituem o acompanhamento no Jira; elas reforçam a revisão e evitam integrações acidentais.
