const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const ProdutoModel = sequelize.define('Produto',
    {
        id_produto: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        nome: DataTypes.STRING,
        tipo: DataTypes.STRING,
        quantidade: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
        preco: { type: DataTypes.FLOAT, allowNull: false }
    }
)
module.exports = {
    save: async function (nome, tipo, quantidade, preco) {
        try {
            const produto = await ProdutoModel.create({
                nome: nome,
                tipo: tipo,
                quantidade: quantidade,
                preco: preco,
            });
            return produto;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    },

    findByPk: async function (ID_produto) {
        try {
            const produto = await ProdutoModel.findByPk(ID_produto);
            return produto;
        } catch (error) {
            console.error('Error finding product by PK:', error);
            throw error;
        }
    },
    Model: ProdutoModel
};