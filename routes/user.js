var express = require('express');
var router = express.Router();
const sequelize = require("../helpers/PostgreSQL")
const FuncModel = require("../model/Func");
const { validarFunc, validarGerente } = require('../helpers/validadeLogin');

// Cadastro apenas de funcionário com cargo Caixa
router.post('/cadastro', async function (req, res) {
	const { senha, nome, email } = req.body;

	if (!senha) {
		return res.status(403).send({ status: false, msg: "senha não enviada" })
	}

	const a = await FuncModel.save(senha, nome, email, 'Caixa');
	return res.send({ status: true, msg: "Usuário criado, use o ID abaixo para o login", id: a.id_func });
});

// Alteração de Funcionário, só pode alterar se o ID do login for o mesmo do ID a ser alterado
router.post('/altera', validarFunc, async function (req, res) {
	const { id, senha, nome, email } = req.body;

	if (!senha || !id) {
		return res.status(403).send({ status: false, msg: "senha ou id não enviada" })
	}

	if (req.id != id) {
		return res.status(403).send({ status: false, msg: "não pode alterar os dados de outro usuário" })
	}
	const a = await FuncModel.updateById(id, senha, nome, email)
	if (!a) {
		return res.status(404).send({ status: false, msg: "Usuário não encontrado" })
	}
	return res.status(200).send({ status: true, msg: "Usuário alterado", Func: a });
});

// roda ADMIN de Cadastro
router.post('/admin/cadastro', validarGerente, async function (req, res) {
	const { senha, nome, email } = req.body;

	if (!senha || !cargo) {
		return res.status(403).send({ status: false, msg: "senha ou cargo não enviada" })
	}

	const a = await FuncModel.save(senha, nome, email, cargo);
	return res.send({ status: true, msg: "Usuário criado, use o ID abaixo para o login", id: a.id_func });
});

router.post('/admin/altera', validarGerente, async function (req, res) {
	const { id, senha, nome, email } = req.body;

	if (!senha || !id) {
		return res.status(403).send({ status: false, msg: "senha ou id não enviada" })
	}

	const a = await FuncModel.updateById(id, senha, nome, email)
	if (!a) {
		return res.status(404).send({ status: false, msg: "Usuário não encontrado" })
	}
	return res.status(200).send({ status: true, msg: "Usuário alterado", Func: a });
});

// rota ADMIN de Alteração de Funcionário
router.delete('/admin/delete/:fID', async function (req, res, next) {
	const funcID = req.params.fID;
	if (!funcID) {
		return res.status(403).json({ status: false, mensagem: 'ID do funcionário a ser excluido não foi informado' })
	}
	const func = FuncModel.deleteById(funcID)
	console.log(func)

	if (!func) {
		return res.status(403).json({ status: false, mensagem: 'ID do funcionário não existe' })
	}

	return res.status(200).json({ status: true, mensagem: 'Funcionário deletado' })
});

module.exports = router;
