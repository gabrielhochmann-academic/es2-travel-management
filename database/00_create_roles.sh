#!/usr/bin/env sh
set -eu

: "${POSTGRES_APP_USER:?Defina POSTGRES_APP_USER no arquivo .env}"
: "${POSTGRES_APP_PASSWORD:?Defina POSTGRES_APP_PASSWORD no arquivo .env}"
: "${POSTGRES_READONLY_USER:?Defina POSTGRES_READONLY_USER no arquivo .env}"
: "${POSTGRES_READONLY_PASSWORD:?Defina POSTGRES_READONLY_PASSWORD no arquivo .env}"

app_user=$(printf '%s' "$POSTGRES_APP_USER" | sed 's/"/""/g')
app_password=$(printf '%s' "$POSTGRES_APP_PASSWORD" | sed "s/'/''/g")
readonly_user=$(printf '%s' "$POSTGRES_READONLY_USER" | sed 's/"/""/g')
readonly_password=$(printf '%s' "$POSTGRES_READONLY_PASSWORD" | sed "s/'/''/g")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    REVOKE ALL ON DATABASE "$POSTGRES_DB" FROM PUBLIC;
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;

    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sgv_application') THEN
            CREATE ROLE sgv_application NOLOGIN;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sgv_readonly') THEN
            CREATE ROLE sgv_readonly NOLOGIN;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${app_user}') THEN
            CREATE ROLE "${app_user}" LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT PASSWORD '${app_password}';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${readonly_user}') THEN
            CREATE ROLE "${readonly_user}" LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT PASSWORD '${readonly_password}';
        END IF;
    END
    \$\$;

    GRANT CONNECT ON DATABASE "$POSTGRES_DB" TO sgv_application, sgv_readonly;
    GRANT USAGE ON SCHEMA public TO sgv_application, sgv_readonly;
    GRANT sgv_application TO "${app_user}";
    GRANT sgv_readonly TO "${readonly_user}";

    ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sgv_application;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT SELECT ON TABLES TO sgv_readonly;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT USAGE, SELECT ON SEQUENCES TO sgv_application;
EOSQL
