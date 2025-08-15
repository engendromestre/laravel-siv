# Makefile de produção

# Variáveis
COMPOSE_FILE := production/compose.yml
PROJECT_NAME := siv_prod

# Atalhos principais
.PHONY: ps build up down downv restart logs clean \
        exec artisan migrate seed test tinker \
        composer npm bash

ps:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) ps

build:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) build --no-cache

up:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d

down:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down

downv:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down -v

restart: down up

logs:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) logs -f

# Remove containers, redes, volumes não usados
clean:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) down --volumes --remove-orphans
	docker system prune -f

# Executar comando dentro do container app
exec:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app $(cmd)

# Helpers para Laravel
artisan:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app php artisan $(cmd)

migrate:
	$(MAKE) artisan cmd="migrate --force"

seed:
	$(MAKE) artisan cmd="db:seed --force"

tinker:
	$(MAKE) artisan cmd="tinker"

# Composer / NPM dentro do container
composer:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app composer $(cmd)

npm:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app npm $(cmd)

# Bash interativo
bash:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app bash

# PHPUnit
test:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) exec app vendor/bin/phpunit