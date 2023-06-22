const jwt = require("jsonwebtoken");

function validarFunc(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Não tem header" });
	}

	const token = authHeader.split(" ")[1]; // Extrair o token do cabeçalho "Authorization"

	if (!token) {
		return res.status(401).json({ message: "Tem coisa errado" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req.id = decoded.id;
		req.cargo = decoded.cargo;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid token" });
	}
}

function validarGerente(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Não tem header" });
	}

	const token = authHeader.split(" ")[1]; // Extrair o token do cabeçalho "Authorization"

	if (!token) {
		return res.status(401).json({ message: "Tem coisa errado" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		if (decoded.cargo != "Gerente") {
			return res.status(403).json({ message: "Usuário não é gerente" });
		}
		req.id = decoded.id;
		req.cargo = decoded.cargo;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid token" });
	}
}

module.exports = { validarFunc, validarGerente };