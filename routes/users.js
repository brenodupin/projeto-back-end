var express = require('express');
var router = express.Router();
const sequelize = require("../helpers/PostgreSQL")
const AlunoModel = require("../model/Aluno")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  //await sequelize.sync({force: true})

  let book1 = await AlunoModel.save("1827642", "Breno", 0)

  res.send('respond with a resource123 brenao');
});

module.exports = router;
