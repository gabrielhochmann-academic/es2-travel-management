# Encerramento da Sprint 4

> **Marco Git:** `sprint-4`
> **Período:** 14/09/2026 a 21/09/2026
> **Data de encerramento:** 21/09/2026

## Objetivo

Consolidar a versão final do SGV, implementar custos e indicadores, corrigir inconsistências e registrar o débito técnico remanescente.

## Funcionalidades integradas

| Funcionalidade | Evidência |
|---|---|
| Custos de deslocamento, hospedagem e táxi | `Trip`, `UpdateCostsRequest` e `PUT /api/trips/{id}/costs` |
| Custo total | Calculado no backend pela soma das três categorias |
| Indicadores | Total, média, quantidades aprovadas e rejeitadas, categoria de maior peso e viagem mais cara |
| Painel de custos | `frontend/src/pages/CostsDashboard.tsx` |
| Persistência dos custos | PostgreSQL por JPA, com estrutura documentada em `database/trips.sql` |

## Validação

A entrega foi validada com Java 21 e Node.js 22:

```bash
mvn --file backend/pom.xml test
npm --prefix frontend ci
npm --prefix frontend run build
```

O workflow `.github/workflows/ci.yml` repete essas verificações em pushes e pull requests para a `main`.

## Débito técnico remanescente

| Débito | Classificação | Juros | Esforço | Definição de pronto |
|---|---|---|---|---|
| Integrar a tela principal à API | Inadvertido e imprudente | Dados exibidos podem divergir do PostgreSQL | Grande | Cadastro, listagem e transições da tela usam somente a API |
| Completar o fluxo de aprovação | Deliberado e prudente | Cancelamento, ajustes e rastreabilidade ficam indisponíveis | Grande | Estados, transições e histórico possuem testes e persistência |
| Modelar empregados, cargos e áreas | Deliberado e prudente | Não é possível validar gestor nem preservar contexto organizacional | Grande | Cadastros, vínculos e histórico temporal estão persistidos |
| Corrigir baselines de tags | Inadvertido e imprudente | Recuperação histórica pode produzir uma versão diferente da declarada | Pequeno | Equipe decide e documenta a correção sem perder referências antigas |
| Ampliar testes automatizados | Deliberado e prudente | Regressões podem chegar à `main` sem detecção suficiente | Médio | Serviços, controladores e fluxo integrado têm testes relevantes |

Cada débito possui tarefa própria no Jira. Não foram registrados worklogs automaticamente porque as horas reais precisam ser informadas por cada integrante.

## Revisões e retrospectivas

O histórico consolidado está em `docs/sprints/revisoes-e-retrospectivas.md`.

## Recuperação

Após a validação e integração desta documentação na `main`, a tag `sprint-4` identifica a baseline final. A tag adicional solicitada pelo professor, `techical-debt`, identifica o mesmo commit final e mantém a grafia recebida no enunciado.
