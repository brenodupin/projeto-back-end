var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const sequelize_admin = require('../helpers/PostgreSQL')

/* GET home page. */
router.get('/', async function (req, res, next) {
    const token = jwt.sign({ id: 'teste'}, 'minhasenha', {
        expiresIn: '1 hr'
    });
    res.send(token)
});

module.exports = router;