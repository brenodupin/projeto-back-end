const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const Aluno = require("./Aluno")
const Produto = require("./Produto")
const Func = require("./Func")

const TransacaoModel = sequelize.define('Transacao', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        hora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        valorTotal: { type: DataTypes.FLOAT, allowNull: false },
        formaPagamento: {type: DataTypes.STRING(8), allowNull: false }
    }
)

TransacaoModel.belongsTo(Aluno.Model, { foreignKey: 'idAluno' })
TransacaoModel.belongsTo(Produto.Model, { foreignKey: 'idProduto' })
TransacaoModel.belongsTo(Func.Model, { foreignKey: 'idFunc' })

Aluno.Model.hasMany(TransacaoModel, {foreignKey: 'idAluno'})
Produto.Model.hasMany(TransacaoModel, {foreignKey: 'idProduto'})
Func.Model.hasMany(TransacaoModel, {foreignKey: 'idFunc'})

module.exports = { Model: TransacaoModel };