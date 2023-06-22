const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const Aluno = require("./Aluno")
const Produto = require("./Produto")
const Func = require("./Func")

const TransacaoModel = sequelize.define('Transacao',
    {
        id_venda: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        valor_prod: { type: DataTypes.FLOAT, allowNull: false },
        valor_total: { type: DataTypes.FLOAT, allowNull: false },
        forma_pgto: { type: DataTypes.STRING(8), allowNull: false }
    }
)

TransacaoModel.belongsTo(Aluno.Model, { foreignKey: 'ID_aluno' })
TransacaoModel.belongsTo(Produto.Model, { foreignKey: 'ID_produto' })
TransacaoModel.belongsTo(Func.Model, { foreignKey: 'ID_func' })

Aluno.Model.hasMany(TransacaoModel, { foreignKey: 'ID_aluno' })
Produto.Model.hasMany(TransacaoModel, { foreignKey: 'ID_produto' })
Func.Model.hasMany(TransacaoModel, { foreignKey: 'ID_func' })

module.exports = {
    save: async function (ID_aluno, ID_func, ID_produto, quantidade, valor_prod, valor_total, forma_pgto) {
        try {
            const transacao = await TransacaoModel.create({
                ID_aluno: ID_aluno,
                ID_func: ID_func,
                ID_produto: ID_produto,
                quantidade: quantidade,
                valor_prod: valor_prod,
                valor_total: valor_total,
                forma_pgto: forma_pgto,
            });
            return transacao;
        } catch (error) {
            console.error('Error saving transaction:', error);
            throw error;
        }
    },

    findByPk: async function (ID_venda) {
        try {
            const transacao = await TransacaoModel.findByPk(ID_venda);
            return transacao;
        } catch (error) {
            console.error('Error finding transaction by PK:', error);
            throw error;
        }
    },
    qtd: async function () {
        try {
            const quantidade = await TransacaoModel.count();
            return quantidade;
        } catch (error) {
            console.error('Error getting transaction count:', error);
            throw error;
        }
    },
    Model: TransacaoModel
};