export

COMPOSE = docker-compose -f docker-compose.yml

build:
	$(COMPOSE) build

start:
	$(COMPOSE) up -d

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

prune:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

dev-start:
	$(COMPOSE) up -d db

dev-stop:
	$(COMPOSE) stop db

test-start:
	$(COMPOSE) up -d testdb

test-stop:
	$(COMPOSE) stop testdb
