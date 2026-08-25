# Configuração de Ambiente e Credenciais

> **Princípio do SGV:** valores específicos de ambiente, senhas, tokens e chaves não fazem parte do código-fonte versionado.

## Como o projeto separa código e configuração

O repositório contém o arquivo [`.env.example`](../.env.example), que documenta as variáveis necessárias com valores exclusivamente demonstrativos. Cada integrante deve criar o próprio arquivo `.env` local, que é ignorado pelo Git e nunca deve ser enviado ao GitHub.

| Arquivo | Versionamento | Finalidade |
|---|---:|---|
| `.env.example` | Sim | Modelo público com os nomes das variáveis necessárias. |
| `.env` | Não | Configuração local da máquina, incluindo senha do banco. |
| `docker-compose.yml` | Sim | Referencia as variáveis com `${NOME_DA_VARIAVEL}` sem gravar credenciais. |
| `application.yml` | Sim | Lê as configurações que o ambiente fornece ao backend. |

---

## Preparação do ambiente local

Na primeira execução, crie o arquivo local a partir do modelo:

```bash
cp .env.example .env
```

Depois, abra `.env` no seu editor e substitua o valor demonstrativo de `POSTGRES_PASSWORD` por uma senha local. O arquivo não deve ser exibido em apresentações, incluído em capturas de tela, anexado ao Jira ou enviado por mensagens.

Com o Docker Desktop ativo, inicie os serviços:

```bash
docker compose up --build
```

O Docker Compose injeta as variáveis no PostgreSQL e no backend. Assim, o projeto permanece reproduzível sem tornar a senha pública no repositório.

---

## Atenção ao volume PostgreSQL existente

O PostgreSQL cria o usuário e a senha somente na inicialização de um volume novo. Se a equipe já possui o volume `postgres_data` criado com credenciais anteriores, alterar `POSTGRES_USER` ou `POSTGRES_PASSWORD` no `.env` não modifica aquele banco já existente.

Para um ambiente local descartável, recrie o volume antes de subir novamente os serviços:

```bash
docker compose down -v
docker compose up --build
```

> **Atenção:** `docker compose down -v` apaga os dados locais do volume. Se houver dados relevantes para demonstração ou validação, gere um backup lógico antes de executar esse comando.

---

## Regras de segurança

| Situação | Regra do projeto |
|---|---|
| Senha, token, chave de API ou certificado | Nunca versionar nem compartilhar em documentos, cards, capturas ou gravações. |
| Variáveis do frontend | Somente valores públicos. Em Vite, variáveis `VITE_*` ficam visíveis no navegador. |
| Backend e banco de dados | Recebem valores sensíveis por variáveis de ambiente. |
| Integração contínua ou produção | Usar secrets da plataforma de CI/CD ou do ambiente de hospedagem. |
| Credencial publicada por engano | Revogar ou rotacionar imediatamente; apagar o arquivo não remove o valor do histórico Git. |

---

## Validação antes de publicar

Antes de abrir um pull request ou encerrar uma sprint, a equipe deve confirmar que o comando abaixo não lista arquivos `.env` locais:

```bash
git status
```

Também deve conferir se os arquivos versionados contêm somente referências como `${POSTGRES_PASSWORD}` e nunca o valor real da senha.
