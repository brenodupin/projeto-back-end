# projeto-back-end
Projeto Web Back-end

## PostgreSQL Docker

docker run -d --name "pweb-postgres" -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=api_pweb -p 5432:5432 postgres:12-alpine