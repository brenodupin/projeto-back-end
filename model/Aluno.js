const {DataTypes} = require("sequelize")

const AlunoModel = sequelize.define('Aluno', 
    {
        RA: DataTypes.STRING(7),
        nome: DataTypes.STRING,
        saldo: DataTypes.FLOAT
    }
)
