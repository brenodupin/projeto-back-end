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

TransacaoModel.belongsTo(Aluno.Model, { foreignKey: 'id_aluno' })
TransacaoModel.belongsTo(Produto.Model, { foreignKey: 'id_produto' })
TransacaoModel.belongsTo(Func.Model, { foreignKey: 'id_func' })

Aluno.Model.hasMany(TransacaoModel, { foreignKey: 'id_aluno' })
Produto.Model.hasMany(TransacaoModel, { foreignKey: 'id_produto' })
Func.Model.hasMany(TransacaoModel, { foreignKey: 'id_func' })

module.exports = {
    save: async function (id_aluno, id_func, id_produto, quantidade, valor_prod, valor_total, forma_pgto) {
        try {
            const transacao = await TransacaoModel.create({
                id_aluno: id_aluno,
                id_func: id_func,
                id_produto: id_produto,
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

    findByPk: async function (id_venda) {
        try {
            const transacao = await TransacaoModel.findByPk(id_venda);
            return transacao;
        } catch (error) {
            console.error('Error finding transaction by PK:', error);
            throw error;
        }
    },
    deleteById: async function (ID_tr) {
        try {
            const tr = await TransacaoModel.findByPk(ID_tr);
            if (tr) {
                await tr.destroy();
                return tr;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error deleting transacao by ID:', error);
            throw error;
        }
    },
    Model: TransacaoModel
};