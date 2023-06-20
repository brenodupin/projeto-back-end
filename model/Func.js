const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const FuncModel = sequelize.define('Func',
    {
        ID_func: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        senha: DataTypes.STRING,
        nome: DataTypes.STRING,
        email: { type: DataTypes.STRING, allowNull: false },
        cargo: { type: DataTypes.STRING(7), allowNull: false }
    }
)

module.exports = {
    save: async function (senha, nome, email, cargo) {
        try {
            const func = await FuncModel.create({
                senha: senha,
                nome: nome,
                email: email,
                cargo: cargo,
            });
            return func;
        } catch (error) {
            console.error('Error saving functionary:', error);
            throw error;
        }
    },

    findByPk: async function (ID_func) {
        try {
            const func = await FuncModel.findByPk(ID_func);
            return func;
        } catch (error) {
            console.error('Error finding functionary by PK:', error);
            throw error;
        }
    },
    Model: FuncModel
};