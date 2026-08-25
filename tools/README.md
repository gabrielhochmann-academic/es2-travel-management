# Ferramentas de apoio

Esta pasta reúne automações auxiliares usadas para **gerar ou manter artefatos versionados** do Sistema de Gestão de Viagens (SGV). Ela não contém código de execução do produto; seu propósito é tornar a manutenção dos documentos mais reproduzível para a equipe.

## Gerador do Documento de Visão

O script [`generate_vision_document.py`](generate_vision_document.py) gera o arquivo Word abaixo com o padrão visual adotado pelo projeto:

```text
docs/visao/Documento-de-Visao-SGV.docx
```

O documento é composto a partir do conteúdo definido no próprio script e utiliza a imagem institucional localizada em `docs/visao/unioeste-logo.png`.

### Quando utilizar

Execute o gerador somente quando for necessário atualizar o conteúdo ou a apresentação visual do Documento de Visão. Exemplos incluem a inclusão de requisitos aprovados, mudanças de escopo, atualização do histórico de versões ou aprimoramentos de layout.

### Como executar

A partir da raiz do repositório, instale a dependência uma única vez:

```bash
pip3 install python-docx
```

Depois, gere novamente o documento:

```bash
python3 tools/generate_vision_document.py
```

Após a geração, revise visualmente o arquivo `.docx`, atualize o histórico de versões quando aplicável e versione juntos o documento, sua imagem de apoio e qualquer alteração no script.

## Critério de inclusão nesta pasta

Uma ferramenta só deve permanecer em `tools/` quando contribuir para a repetição confiável de uma tarefa do projeto. Scripts temporários, testes pontuais ou arquivos de análise não devem ser mantidos aqui.
