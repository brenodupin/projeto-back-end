var express = require('express');
var router = express.Router();

const Transacao = require("../model/Transacao");
const Aluno = require("../model/Aluno");
const Produto = require("../model/Produto");
const Func = require('../model/Func');

const sequelize_admin = require("../helpers/PostgreSQL");
const { validarFunc, validarGerente } = require('../helpers/validadeLogin');

function validaParams(limite, pagina) {
    var result = { limite: 10, inicio: 1 };

    if (limite) {
        limite = parseInt(limite);
        if (limite === undefined || isNaN(limite)) result.error = "Limite não é um numero";
        if (![5, 10, 30].includes(limite) && !result.error) result.error = "Limite incluido não é 5, 10 ou 30";
        if (result.error) return result;
        result.limite = limite;
    }

    if (pagina) {
        pagina = parseInt(pagina);
        if (pagina === undefined || isNaN(pagina)) result.error = "Pagina não é um numero";
        if (pagina <= 0 && !result.error) result.error = "Pagina é menor ou igual a 0";
        if (result.error) return result;
        result.inicio = (pagina - 1) * limite; // calcula por onde deve começar
    }
    return result;
}

// Listar Transações
router.get('/tr', validarFunc, async function (req, res) {
    var { limite, inicio, error } = validaParams(req.query.limite, req.query.pagina);
    if (error) return res.status(403).json({ status: false, error: error });

    try {
        const registros = await Transacao.Model.findAll({
            limit: limite,
            offset: inicio
        });

        return res.status(200).json({ status: true, Query: registros });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});

// Listar Produtos
router.get('/tr', validarFunc, async function (req, res) {
    var { limite, inicio, error } = validaParams(req.query.limite, req.query.pagina);
    if (error) return res.status(403).json({ status: false, error: error });

    try {
        const registros = await Produto.Model.findAll({
            limit: limite,
            offset: inicio
        });

        return res.status(200).json({ status: true, Query: registros });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});

// Listar Funcionários, APENAS GERENTE
router.get('/tr', validarFunc, async function (req, res) {
    var { limite, inicio, error } = validaParams(req.query.limite, req.query.pagina);
    if (error) return res.status(403).json({ status: false, error: error });

    try {
        const registros = await Func.Model.findAll({
            limit: limite,
            offset: inicio
        });

        return res.status(200).json({ status: true, Query: registros });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});

// Listar Alunos, SOMENETE GERENTE
router.get('/aluno', validarGerente, async function (req, res) {
    var { limite, inicio, error } = validaParams(req.query.limite, req.query.pagina);
    if (error) return res.status(403).json({ status: false, error: error });

    try {
        const registros = await Aluno.Model.findAll({
            limit: limite,
            offset: inicio
        });

        return res.status(200).json({ status: true, Query: registros });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});


// listas a VIEW, vendo como fazer a paginação
router.get('/view', async function (req, res, next) {
    const [results, metadata] = await sequelize_admin.query("SELECT * FROM view_total;");
    return res.status(200).json({ status: true, msg: "Query feita: SELECT * FROM view_total", results })
});

module.exports = router;