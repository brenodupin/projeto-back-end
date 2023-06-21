var express = require('express');
var router = express.Router();
const sequelize = require("../helpers/PostgreSQL")
const AlunoModel = require("../model/Aluno")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  


  res.send('respond with a resource123 brenao');
});

module.exports = router;
