#!/usr/bin/env sh
set -eu

: "${POSTGRES_DB:?Defina POSTGRES_DB no arquivo .env}"
: "${POSTGRES_USER:?Defina POSTGRES_ADMIN_USER no arquivo .env}"
: "${POSTGRES_APP_USER:?Defina POSTGRES_APP_USER no arquivo .env}"
: "${POSTGRES_APP_PASSWORD:?Defina POSTGRES_APP_PASSWORD no arquivo .env}"
: "${POSTGRES_READONLY_USER:?Defina POSTGRES_READONLY_USER no arquivo .env}"
: "${POSTGRES_READONLY_PASSWORD:?Defina POSTGRES_READONLY_PASSWORD no arquivo .env}"

psql -v ON_ERROR_STOP=1 \
     --username "$POSTGRES_USER" \
     --dbname "$POSTGRES_DB" \
     -v db_name="$POSTGRES_DB" \
     -v admin_user="$POSTGRES_USER" \
     -v app_user="$POSTGRES_APP_USER" \
     -v readonly_user="$POSTGRES_READONLY_USER" \
<<-'EOSQL'
    -- Lê as senhas com segurança diretamente do ambiente
    \getenv app_password POSTGRES_APP_PASSWORD
    \getenv readonly_password POSTGRES_READONLY_PASSWORD

    REVOKE ALL ON DATABASE :"db_name" FROM PUBLIC;
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;

    -- Group roles (sem login): centralizam as permissões
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sgv_application') THEN
            CREATE ROLE sgv_application NOLOGIN;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sgv_readonly') THEN
            CREATE ROLE sgv_readonly NOLOGIN;
        END IF;
    END
    $$;

    -- Login roles (usuários reais): cria se não existir ou atualiza a senha caso mude no .env
    -- Usamos format() com literals diretos do psql para evitar conflito de escopo no plpgsql
    SELECT 
        CASE 
            WHEN NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'app_user') THEN
                format('CREATE ROLE %I WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT PASSWORD %L', :'app_user', :'app_password')
            ELSE
                format('ALTER ROLE %I WITH PASSWORD %L', :'app_user', :'app_password')
        END \gexec

    SELECT 
        CASE 
            WHEN NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'readonly_user') THEN
                format('CREATE ROLE %I WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT PASSWORD %L', :'readonly_user', :'readonly_password')
            ELSE
                format('ALTER ROLE %I WITH PASSWORD %L', :'readonly_user', :'readonly_password')
        END \gexec

    GRANT CONNECT ON DATABASE :"db_name" TO sgv_application, sgv_readonly;
    GRANT USAGE ON SCHEMA public TO sgv_application, sgv_readonly;
    GRANT sgv_application TO :"app_user";
    GRANT sgv_readonly TO :"readonly_user";

    -- 1. Permissões para as tabelas que já existem no schema.
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO sgv_application;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO sgv_readonly;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sgv_application;

    -- 2. Permissões padrão para tabelas futuras criadas pelo admin
    ALTER DEFAULT PRIVILEGES FOR ROLE :"admin_user" IN SCHEMA public
        GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sgv_application;
    ALTER DEFAULT PRIVILEGES FOR ROLE :"admin_user" IN SCHEMA public
        GRANT SELECT ON TABLES TO sgv_readonly;
    ALTER DEFAULT PRIVILEGES FOR ROLE :"admin_user" IN SCHEMA public
        GRANT USAGE, SELECT ON SEQUENCES TO sgv_application;
EOSQL