var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const FuncModel = require("../model/Func")

/* GET home page. */
router.post("/", async (req, res) => {
    let { id, senha } = req.body
    if (!id || !senha) {
        return res.status(400).json({ status: false, mensagem: 'ID ou senha não informados' })
    }
    id = parseInt(id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ status: false, mensagem: 'ID Inválido' });

    let expected = await FuncModel.getSenhaCargoByID(id)
    if (!expected) return res.status(400).json({ status: false, mensagem: 'Funcionário não encontrado' })
    //console.log(expected)
    if (expected.senha == senha) {
        let token = jwt.sign({ id: id, cargo: expected.cargo }, process.env.SECRET, { expiresIn: "20 min" })
        return res.status(200).json({ status: true, token: token })
    } else {
        return res.status(403).json({ status: false, mensagem: 'Senha incorreta' })
    }
})

module.exports = router;