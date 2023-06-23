function validaParams(req, res, next) {
    var { limite, pagina } = req.query;
    console.log(req.query)

    if (limite) {
        limite = parseInt(limite);
        if (!Number.isInteger(limite))
            return res.status(400).json({ status: false, error: "Limite não é um numero" });

        if (![5, 10, 30].includes(limite))
            return res.status(400).json({ status: false, error: "Limite incluido não é 5, 10 ou 30" });
        
        req.limite = limite
    } else req.limite = 10;

    if (pagina) {
        pagina = parseInt(pagina);
        if (!Number.isInteger(pagina))
            return res.status(400).json({ status: false, error: "Pagina não é um numero" });

        if (pagina <= 0)
            return res.status(400).json({ status: false, error: "Pagina é menor ou igual a 0" });
        req.inico = (pagina - 1) * req.limite; // calcula por onde deve começar
    } else req.inico = 1;
    next();
}

module.exports = validaParams;