# Projeto Web Back-end e BD2

### Instalação

1. Clonar esse repo
```bash
git clone https://github.com/brenodupin/projeto-back-end
cd projeto-back-end
```
2. Criar e configurar um arquivo .env com os dados do Postgres
Exemplo:
```env
DB_NAME=<nome do databse>
DB_USER=<usuário>
DB_PASSWORD=<senha>
DB_HOST=<hostname>
DB_PORT=5432
DB_DIALECT=postgres
SECRET=<qualquer string (usada na criação do jjwt)>
```
3. Instalar e rodar ([Node.js](https://nodejs.org/en) >= 12)
```bash
npm install
npm start
```
