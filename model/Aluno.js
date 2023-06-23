const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const AlunoModel = sequelize.define('Aluno',
    {
        RA: { type: DataTypes.STRING(7), primaryKey: true, allowNull: false },
        nome: DataTypes.STRING,
        saldo: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
    });
module.exports = {
    save: async function (RA, nome, saldo) {
        const aluno = await AlunoModel.create({
            RA: RA,
            nome: nome,
            saldo: saldo
        })
        return aluno
    },
    findByRA: async function (RA) {
        try {
            const func = await AlunoModel.findByPk(RA);
            return func;
        } catch (error) {
            console.error('Error finding aluno by PK:', error);
            throw error;
        }
    },
    updateSaldobyRA: async function (RA, saldo) {
        try {
            const aluno = await AlunoModel.findByPk(RA);
            if (aluno) {
                aluno.saldo = saldo;
                await aluno.save();
                return aluno;
            } else {
                throw new Error('Aluno não encontrado');
            }
        } catch (error) {
            console.error('Error updating aluno saldo:', error);
            throw error;
        }
    },
    Model: AlunoModel
};