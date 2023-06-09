var express = require('express');
var router = express.Router();

const Transacao = require("../model/Transacao");
const Aluno = require("../model/Aluno");
const Produto = require("../model/Produto");
const Func = require('../model/Func');

const sequelize_admin = require("../helpers/PostgreSQL");
const { validarFunc, validarGerente } = require('../helpers/validadeLogin');
const validaParams = require("../helpers/validaParams");

// listas a VIEW, SEM PAGINAÇÃO
router.get('/view', validarFunc, async function (req, res) {
    const [results, metadata] = await sequelize_admin.query("SELECT * FROM view_total;");
    return res.status(200).json({ status: true, msg: "Query feita: SELECT * FROM view_total", results })
});

// GET do aluno por RA
router.get('/aluno/:RA', validarGerente, async function (req, res) {
    const RA = req.params.RA;
    if (typeof RA !== 'string' || RA.length !== 7) return res.status(400).json({ status: false, error: 'RA inválido' });
    const aluno = await Aluno.findByRA(RA);
    if (!aluno) return res.status(400).json({ status: false, error: 'RA não foi encontrado' });
    return res.status(200).json({ status: true, Query: aluno });
});

// faz todas as rodas GET por id MENOS a de aluno
router.get('/:type/:id', validarFunc, async function (req, res) {
    const type = req.params.type;
    const id = parseInt(req.params.id);

    if (!['tr', 'func', 'produto'].includes(type))
        return res.status(400).json({ status: false, error: 'Tipo inválido, só pode ser "tr" ou "func"' });


    if (!Number.isInteger(id) || id <= 0)
        return res.status(400).json({ status: false, error: 'ID inválido' });

    var registros;
    try {
        switch (type) {
            case 'tr':
                registros = await Transacao.findByPk(id);
                break;
            case 'func':
                if (req.cargo == 'Gerente') registros = await Func.findByID(id);
                else return res.status(403).json({ status: false, error: 'Permissão Inválida' });
                break;
            case 'produto':
                registros = await Produto.findByID(id);
                break;
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
    if (!registros) return res.status(400).json({ status: false, error: 'ID não encontrado' });
    return res.status(200).json({ status: true, Query: registros });
});

// Listar Transações
router.get('/:type', validarFunc, validaParams, async function (req, res, next) {
    const type = req.params.type;

    if (!['aluno', 'tr', 'func', 'produto'].includes(type))
        return res.status(400).json({ status: false, error: 'Tipo inválido, só pode ser "aluno", "tr" ou "func"' })


    try {
        switch (type) {
            case 'aluno':
                console.log("alunos here")
                if (req.cargo == 'Gerente') registros = await Aluno.Model.findAll({ limit: req.limite, offset: req.inicio });
                else return res.status(403).json({ status: false, error: 'Permissão Inválida' });
                break;
            case 'tr':
                registros = await Transacao.Model.findAll({ limit: req.limite, offset: req.inicio });
                break;
            case 'func':
                if (req.cargo == 'Gerente') registros = await Func.Model.findAll({ limit: req.limite, offset: req.inicio });
                else return res.status(403).json({ status: false, error: 'Permissão Inválida' });
                break;
            case 'produto':
                registros = await Produto.Model.findAll({ limit: req.limite, offset: req.inicio });
                break;
        }

        return res.status(200).json({ status: true, Query: registros });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});

router.post('/criatr', validarFunc, async function (req, res) {
    console.log(req.body)
    var { id_aluno, id_produto, quantidade, pag } = req.body;
    if (!id_aluno || !id_produto || !quantidade || !pag)
        return res.status(400).json({ status: false, error: 'Algum campo vazio' });

    id_produto = parseInt(id_produto);
    quantidade = parseInt(quantidade);

    if (!Number.isInteger(id_produto) || !Number.isInteger(quantidade))
        return res.status(400).json({ status: false, error: 'id_func, id_produto ou quantidade não é numero' });

    if (typeof id_aluno !== 'string' || id_aluno.length !== 7) return res.status(400).json({ status: false, error: 'RA inválido' });

    const produto = await Produto.findByID(id_produto)
    if (!produto || produto.quantidade < quantidade)
        return res.status(400).json({ status: false, error: 'Produto não encontrado ou não tem suficiente' });

    const aluno = await Aluno.findByRA(id_aluno);
    const total = produto.preco * quantidade;
    if (!aluno || aluno.saldo < total)
        return res.status(400).json({ status: false, error: 'Aluno não encontrado ou saldo insuficiente' });

    // se chegou aqui, só criar a transacao
    try {
        const result = await sequelize_admin.transaction(async (t) => {
            aluno.saldo = aluno.saldo - total;
            produto.quantidade = produto.quantidade - quantidade;
            await aluno.save({ transaction: t });
            await produto.save({ transaction: t });
            return await Transacao.save(id_aluno, req.id, id_produto, quantidade, produto.preco, total, pag, { transaction: t });
        });
        //const final = await Transacao.save(id_aluno, req.id, id_produto, quantidade, produto.preco, total, pag);
        return res.status(200).json({ status: true, Transacao: result });
    } catch (error) {
        console.error('Error creating transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error', error: error });
    }
});
router.delete('/deletetr/:idtr', validarGerente, async function (req, res) {
    const idtr = parseInt(req.params.idtr)
    console.log(!idtr)
    console.log(Number.isNaN(idtr))
    console.log(idtr <= 0)
    if (!idtr || Number.isNaN(idtr) || idtr <= 0) return res.status(400).json({ status: false, error: 'ID_Transacao inválido' });
    try {
        const tr = await Transacao.deleteById(idtr);
        return res.status(200).json({ status: true, TransacaoDeletada: tr });
    } catch (error) {
        console.error('Error deleting transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error', error: error });
    }
});
module.exports = router;