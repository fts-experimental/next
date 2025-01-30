up:
	docker compose -f docker-compose.dev.yml up -d --build

bash:
	docker compose -f docker-compose.dev.yml exec exp-next-app bash
	
yarn:
	docker compose -f docker-compose.dev.yml exec exp-next-app yarn

dev:
	docker compose -f docker-compose.dev.yml exec exp-next-app yarn dev

test:
	docker compose -f docker-compose.dev.yml exec exp-next-app yarn test

type:
	docker compose -f docker-compose.dev.yml exec exp-next-app yarn tsc

summary:
	echo src | python3 generate_project_summary.py

ck-boiler:
	git checkout boilerplate

ck-main:
	git checkout main