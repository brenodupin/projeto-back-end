const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const AlunoModel = sequelize.define('Aluno',
    {
        RA: { type: DataTypes.STRING(7), primaryKey: true, allowNull: false },
        nome: DataTypes.STRING,
        saldo: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
    }
)
module.exports = {
    save: async function (RA, nome, saldo) {
        const aluno = await AlunoModel.create({
            RA: RA,
            nome: nome,
            saldo: saldo
        })
        return aluno
    },
    getByRa: async function (RA) {
        return await AlunoModel.findByPk(RA)
    }, Model: AlunoModel
};