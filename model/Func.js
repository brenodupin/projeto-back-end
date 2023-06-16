const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const FuncModel = sequelize.define('Func', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        senha: DataTypes.STRING,
        nome: DataTypes.STRING,
        email: { type: DataTypes.STRING, allowNull: false },
        cargo: { type: DataTypes.STRING(9), allowNull: false, defaultValue: "atendente" }
    }
)
module.exports = { Model: FuncModel };