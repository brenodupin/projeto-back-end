const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const ProdutoModel = sequelize.define('Produto', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        nome: DataTypes.STRING,
        tipo: DataTypes.STRING,
        quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        preco: { type: DataTypes.FLOAT, allowNull: false }
    }
)
module.exports = { Model: ProdutoModel };