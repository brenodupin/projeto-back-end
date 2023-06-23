const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/PostgreSQL")

const FuncModel = sequelize.define('Func',
    {
        id_func: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
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
            console.error('Error saving func:', error);
            throw error;
        }
    },

    findByID: async function (ID_func) {
        try {
            const func = await FuncModel.findByPk(ID_func);
            return func;
        } catch (error) {
            console.error('Error finding func by PK:', error);
            throw error;
        }
    },

    getSenhaCargoByID: async function (ID_func) {
        try {
            const funcionario = await FuncModel.findByPk(ID_func, { attributes: ['senha', 'cargo'] });
            if (funcionario) return { senha: funcionario.senha, cargo: funcionario.cargo }
            else return null;
        } catch (error) {
            console.error('Error finding func by PK:', error);
            throw error;
        }
    },
    deleteById: async function (ID_func) {
        try {
            const funcionario = await FuncModel.findByPk(ID_func);
            if (funcionario) {
                await funcionario.destroy();
                return funcionario;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error deleting func by ID:', error);
            throw error;
        }
    },
    updateById: async function (ID_func, senha, nome, email, cargo) {
        try {
            const funcionario = await FuncModel.findByPk(ID_func);
            if (funcionario) {
                if (senha) {
                    funcionario.senha = senha;
                }
                if (nome) {
                    funcionario.nome = nome;
                }
                if (email) {
                    funcionario.email = email;
                }
                if (cargo) {
                    funcionario.cargo = cargo;
                }

                await funcionario.save();
                return funcionario;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating func by ID:', error);
            throw error;
        }
    },
    Model: FuncModel
};