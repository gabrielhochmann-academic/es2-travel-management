# Direções de design — SGV

## Abordagem 1

**Theme Name:** Dossiê de Operações

**Very Brief Intro:** Uma interface de trabalho inspirada em cadernos de operação e mapas de rota, com hierarquia editorial e rastreabilidade visível. Comunica controle, clareza e maturidade acadêmica sem parecer um painel genérico.

**Probability:** 0.07

## Abordagem 2

**Theme Name:** Cartografia Corporativa

**Very Brief Intro:** Um sistema claro e arejado que usa linhas de trajeto, marcadores e recortes cartográficos para transformar gestão de viagens em leitura espacial. A sensação é de planejamento cuidadoso e movimento contínuo.

**Probability:** 0.04

## Abordagem 3

**Theme Name:** Terminal de Campo

**Very Brief Intro:** Uma direção mais técnica, de alto contraste e blocos informacionais compactos, inspirada em instrumentos de controle operacional. O foco recai sobre status, dados e decisões rápidas.

**Probability:** 0.09

---

# Direção escolhida — Dossiê de Operações

## Design Movement

**Modernismo editorial brasileiro aplicado a um sistema operacional acadêmico.** A interface combina rigor documental, tipografia de relatório e sinais discretos de cartografia para tornar o SGV legível, profissional e demonstrável em sala.

## Core Principles

1. **Rastreabilidade visível:** cada tela evidencia estado, responsável e próxima ação sem sobrecarregar a leitura.
2. **Hierarquia documental:** títulos, datas, anotações e indicadores se organizam como um dossiê de projeto, não como cards repetitivos.
3. **Navegação orientada ao fluxo:** o usuário percorre planejamento, aprovação, despesas e indicadores por uma espinha lateral contínua.
4. **Exemplo honesto:** os dados de demonstração aparecem identificados como cenário acadêmico, sem parecerem registros reais da empresa.

## Color Philosophy

O sistema parte de uma base de papel mineral quente, evitando o branco clínico, e usa azul-petróleo como cor de comando e confiança. Laranja-terra aparece apenas para alertas de pendência e verde-sálvia para aprovações, criando leitura operacional sem competir com o conteúdo.

## Layout Paradigm

Uma **coluna de navegação-dossiê** fixa à esquerda sustenta o fluxo do produto. O conteúdo se comporta como páginas de um relatório: cabeçalho editorial assimétrico, trilha de contexto, blocos de informação de larguras variáveis e uma faixa lateral para anotações e estados. A composição evita uma grade centralizada uniforme.

## Signature Elements

1. Linhas finas de percurso e marcadores de rota usados como separadores e indicadores de progresso.
2. Carimbos textuais de status — como `EM RASCUNHO` e `PARA ANÁLISE` — com aparência documental.
3. Pequenas notas de margem que explicam regras de negócio e tornam o exemplo útil para a apresentação acadêmica.

## Interaction Philosophy

As ações importantes se comportam como decisões de fluxo: registrar, submeter e revisar recebem confirmação clara e deixam uma trilha no histórico. Navegação e filtros são diretos; elementos demonstrativos que ainda não existem avisam isso de modo honesto.

## Animation

Entradas breves de 180–240 ms revelam blocos em sequência, como páginas sendo organizadas. Mudanças de status usam apenas cor, opacidade e deslocamento leve; não há efeitos decorativos contínuos. Todas as animações respeitam `prefers-reduced-motion`.

## Typography System

**Fraunces** é usada em títulos e números-chave, trazendo densidade editorial. **Manrope** organiza navegação, formulários e textos de apoio com alta legibilidade. Títulos usam pesos 600–700; corpo usa 400–500; microtextos aparecem em caixa alta com espaçamento ampliado.

## Brand Essence

**Um sistema acadêmico de gestão de viagens que transforma requisitos de negócio em decisões rastreáveis para equipes em formação.**

Personalidade: **metódica, clara, confiável**.

## Brand Voice

Headlines são objetivas e orientadas à operação; CTAs são verbos de fluxo; microcopy explica o porquê de uma regra quando necessário. Evitar frases genéricas de recepção.

Exemplos:

- “Planeje a próxima decisão antes de abrir a próxima viagem.”
- “A viagem só segue para análise quando os dados essenciais estiverem consistentes.”

## Wordmark & Logo

Um símbolo composto por duas curvas de rota que se encontram em um ponto de decisão, formando uma seta discreta e um monograma abstrato `SG`. O símbolo não usa texto e funciona como selo de navegação do produto.

## Signature Brand Color

**Azul de Rota — `#0E4D5A`**.

## Style Decisions

- O exemplo deve apresentar claramente o selo “Cenário demonstrativo — Sprint 0” nas telas que usam dados fictícios.
- A arquitetura visual deve privilegiar o fluxo de uma viagem e sua rastreabilidade, não métricas decorativas.
- O painel deve funcionar como uma apresentação em sala e como um produto inicial: estados, regras e limites precisam ser compreensíveis sem explicação externa.
