var express = require('express');
var router = express.Router();
const AlunoModel = require("../model/Aluno")
const FuncModel = require("../model/Func")
const ProdutoModel = require("../model/Produto")
const TransacaoModel = require("../model/Transacao")
const sequelize_admin = require('../helpers/PostgreSQL');
const { validarFunc, validarGerente } = require('../helpers/validadeLogin')
const fs = require("fs");
const path = require("path")

async function insertAlunos() {
	try {
		const alunos = [
			{ RA: 'RA00001', nome: 'João', saldo: getRandomSaldo() },
			{ RA: 'RA00002', nome: 'Maria', saldo: getRandomSaldo() },
			{ RA: 'RA00003', nome: 'Pedro', saldo: getRandomSaldo() },
			{ RA: 'RA00004', nome: 'Ana', saldo: getRandomSaldo() },
			{ RA: 'RA00005', nome: 'Carlos', saldo: getRandomSaldo() },
			{ RA: 'RA00006', nome: 'Mariana', saldo: getRandomSaldo() },
			{ RA: 'RA00007', nome: 'Lucas', saldo: getRandomSaldo() },
			{ RA: 'RA00008', nome: 'Julia', saldo: getRandomSaldo() },
			{ RA: 'RA00009', nome: 'Gabriel', saldo: getRandomSaldo() },
			{ RA: 'RA00010', nome: 'Laura', saldo: getRandomSaldo() },
		];

		for (const aluno of alunos) {
			await AlunoModel.save(aluno.RA, aluno.nome, aluno.saldo);
		}

		console.log('Alunos inseridos com sucesso!');
	} catch (error) {
		console.error('Erro ao inserir alunos:', error);
	}
}

async function insertFuncionarios() {
	try {
		const funcionarios = [
			{ senha: 'senha123', nome: "Guilherme 1", email: 'guilhermeo@example.com', cargo: 'Gerente' },
			{ senha: 'senha456', nome: 'Camila 2', email: 'camila@example.com', cargo: 'Caixa' },
			{ senha: 'senha789', nome: 'Rafael', email: 'rafael@example.com', cargo: 'Caixa' },
			{ senha: 'senhaabc', nome: 'Fernanda', email: 'fernanda@example.com', cargo: 'Gerente' },
			{ senha: 'senhaxyz', nome: 'Sofia', email: 'sofia@example.com', cargo: 'Caixa' },
			{ senha: 'senha123', nome: 'Letícia', email: 'leticia@example.com', cargo: 'Caixa' },
			{ senha: 'senha456', nome: 'Bruno', email: 'bruno@example.com', cargo: 'Caixa' },
			{ senha: 'senha789', nome: 'Juliana', email: 'juliana@example.com', cargo: 'Gerente' },
			{ senha: 'senhaabc', nome: 'Leonardo', email: 'leonardo@example.com', cargo: 'Caixa' },
			{ senha: 'senhaxyz', nome: 'Vitória', email: 'vitoria@example.com', cargo: 'Gerente' },
		];

		for (const funcionario of funcionarios) {
			await FuncModel.save(funcionario.senha, funcionario.nome, funcionario.email, funcionario.cargo);
		}

		console.log('Funcionários inseridos com sucesso!');
	} catch (error) {
		console.error('Erro ao inserir funcionários:', error);
	}
}

async function insertProdutos() {
	try {
		const produtos = [
			{ nome: "Produto A", tipo: 'Tipo A', quantidade: 10, preco: 9.99 },
			{ nome: "Produto B", tipo: 'Tipo B', quantidade: 5, preco: 19.99 },
			{ nome: 'Produto C', tipo: 'Tipo C', quantidade: 20, preco: 4.99 },
			{ nome: 'Produto D', tipo: 'Tipo A', quantidade: 15, preco: 14.99 },
			{ nome: 'Produto E', tipo: 'Tipo B', quantidade: 8, preco: 12.99 },
			{ nome: 'Produto F', tipo: 'Tipo C', quantidade: 12, preco: 6.99 },
			{ nome: 'Produto G', tipo: 'Tipo A', quantidade: 3, preco: 7.99 },
			{ nome: 'Produto H', tipo: 'Tipo B', quantidade: 6, preco: 9.99 },
			{ nome: 'Produto I', tipo: 'Tipo C', quantidade: 18, preco: 3 },
		];

		for (const produto of produtos) {
			await ProdutoModel.save(produto.nome, produto.tipo, produto.quantidade, produto.preco);
		}

		console.log('Produtos inseridos com sucesso!');
	} catch (error) {
		console.error('Erro ao inserir produtos:', error);
	}
}

function getRandomSaldo() {
	return Math.floor(Math.random() * 101); // Gera um número aleatório entre 0 e 100
}

async function insertTransacoes() {
	try {
		const transacoes = [
			{ ID_aluno: 'RA00001', ID_func: 1, ID_produto: 1, quantidade: 2, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00002', ID_func: 2, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00003', ID_func: 3, ID_produto: 2, quantidade: 3, valor_prod: 19.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00004', ID_func: 4, ID_produto: 1, quantidade: 1, valor_prod: 9.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00005', ID_func: 5, ID_produto: 4, quantidade: 2, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00006', ID_func: 6, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00007', ID_func: 7, ID_produto: 1, quantidade: 3, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00008', ID_func: 8, ID_produto: 2, quantidade: 2, valor_prod: 19.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00009', ID_func: 9, ID_produto: 4, quantidade: 1, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00010', ID_func: 10, ID_produto: 3, quantidade: 2, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00001', ID_func: 1, ID_produto: 1, quantidade: 2, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00002', ID_func: 2, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00003', ID_func: 3, ID_produto: 2, quantidade: 3, valor_prod: 19.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00004', ID_func: 4, ID_produto: 1, quantidade: 1, valor_prod: 9.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00005', ID_func: 5, ID_produto: 4, quantidade: 2, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00006', ID_func: 6, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00007', ID_func: 7, ID_produto: 1, quantidade: 3, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00008', ID_func: 8, ID_produto: 2, quantidade: 2, valor_prod: 19.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00009', ID_func: 9, ID_produto: 4, quantidade: 1, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00010', ID_func: 10, ID_produto: 3, quantidade: 2, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00001', ID_func: 1, ID_produto: 1, quantidade: 2, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00002', ID_func: 2, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00003', ID_func: 3, ID_produto: 2, quantidade: 3, valor_prod: 19.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00004', ID_func: 4, ID_produto: 1, quantidade: 1, valor_prod: 9.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00005', ID_func: 5, ID_produto: 4, quantidade: 2, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00006', ID_func: 6, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00007', ID_func: 7, ID_produto: 1, quantidade: 3, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00008', ID_func: 8, ID_produto: 2, quantidade: 2, valor_prod: 19.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00009', ID_func: 9, ID_produto: 4, quantidade: 1, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00010', ID_func: 10, ID_produto: 3, quantidade: 2, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00001', ID_func: 1, ID_produto: 1, quantidade: 2, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00002', ID_func: 2, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00003', ID_func: 3, ID_produto: 2, quantidade: 3, valor_prod: 19.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00004', ID_func: 4, ID_produto: 1, quantidade: 1, valor_prod: 9.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00005', ID_func: 5, ID_produto: 4, quantidade: 2, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00006', ID_func: 6, ID_produto: 3, quantidade: 1, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00007', ID_func: 7, ID_produto: 1, quantidade: 3, valor_prod: 9.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00008', ID_func: 8, ID_produto: 2, quantidade: 2, valor_prod: 19.99, forma_pgto: 'Dinheiro' },
			{ ID_aluno: 'RA00009', ID_func: 9, ID_produto: 4, quantidade: 1, valor_prod: 14.99, forma_pgto: 'Cartão' },
			{ ID_aluno: 'RA00010', ID_func: 10, ID_produto: 3, quantidade: 2, valor_prod: 4.99, forma_pgto: 'Dinheiro' },
		];

		for (const transacao of transacoes) {
			await TransacaoModel.save(transacao.ID_aluno, transacao.ID_func, transacao.ID_produto, transacao.quantidade,
				transacao.valor_prod, transacao.valor_prod * transacao.quantidade, transacao.forma_pgto);
		}

		console.log('Transações inseridas com sucesso!');
	} catch (error) {
		console.error('Erro ao inserir as transações:', error);
	}
}

/* GET home page. */
router.get('/', async function (req, res, next) {
	// instala as tabelas, views e roles do banco conforme oque está em CREATES_DB.sql
	try {
		const sqlFilePath = "./teste.sql";
		const filePath = path.join(__dirname, '../CREATES_DB.sql');
		console.log(fs.existsSync(filePath))
		console.log(filePath)
		const sqlContent = fs.readFileSync(filePath, "utf8");
		await sequelize_admin.query(sqlContent);
	} catch (error) {
		console.error('Error executing SQL file:', error);
		throw error;
	}

	// insere os dados no banco usando o modelo e não raw sql
	await insertAlunos();
	await insertFuncionarios();
	await insertProdutos();
	await insertTransacoes();

	//sequelize_admin.sync();

	return res.status(200).json({ status: true, msg: "Instalação completa" })
});

module.exports = router;
