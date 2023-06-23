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

### Endpoints:


GET /install (configura o banco de dados e popular ele, **dever ser a primeira a ser usada**)

GET /db/transacao/:name (Retorna todas as Transações onde o aluno do aluno com o nome 'name')

DELETE /db/delete/:funcID (Delete o Funcionário com o ID 'funcID')

GET /db/view (Retorna os valores da View criada no Banco)

TODO login e rodas de usuários
