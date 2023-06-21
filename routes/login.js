var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const FuncModel = require("../model/Func")

/* GET home page. */
router.post("/", async (req, res) => {
    let {id, senha1} = req.body
    if (!id || !senha1) {
        res.status(403).json({status:false, mensagem:'ID ou senha não informados'})
    }
    let expected = await FuncModel.getSenhaCargoByID(id)
    console.log(expected)
    if (expected.senha == senha1) {
        let token = jwt.sign({id: id, cargo: expected.cargo}, process.env.SECRET, {expiresIn: "20 min"})
        res.json({status: true, token: token})
    } else {
        res.status(403).json({status:false, mensagem:'Senha incorreta'})
    }
}) 

module.exports = router;