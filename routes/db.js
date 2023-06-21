var express = require('express');
var router = express.Router();
const FuncModel = require("../model/Func");

const Transacao = require("../model/Transacao");
const Aluno = require("../model/Aluno");
const Produto = require("../model/Produto");

const sequelize_admin = require("../helpers/PostgreSQL")

router.delete('/delete/:userId', async function (req, res, next) {
    const funcID = req.params.userId;
    if (!funcID) {
        res.status(403).json({ status: false, mensagem: 'ID do funcionário a ser excluido não foi informado' })
    }
    const func = FuncModel.deleteById(funcID)
    console.log(func)

    if (!func) {
        res.status(403).json({ status: false, mensagem: 'ID do funcionário não existe' })
    }

    res.status(200).json({ status: true, mensagem: 'Funcionário deletado' })
});

router.get('/tr/:trId', async function (req, res, next) {
    try {
        const transacoes = await Transacao.Model.findAll({
            include: [
                {
                    model: Aluno.Model,
                    where: { nome: req.params.trId },
                },
                Produto.Model,
            ],
        });

        res.status(200).json({ status: true, transacoes})
    } catch (error) {
        console.error('Error getting transacoes by aluno nome:', error);
        throw error;
    }
});

router.get('/view', async function (req, res, next) {

    const [results, metadata] = await sequelize_admin.query("SELECT * FROM view_total;");
    
    res.status(200).json({ status: true, msg: "Query feita SELECT * FROM view_total", results})

});
 
module.exports = router;