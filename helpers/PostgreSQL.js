const { Sequelize } = require('sequelize');

const sequelize_admin = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	dialectOptions: {
		ssl: true
	},
	define: {
		freezeTableName: true
	},
	quoteIdentifiers: false
})

sequelize_admin.authenticate()
	.then(() => console.log("Conectado no Postgres!"))
	.catch(error => console.log(error))

module.exports = sequelize_admin