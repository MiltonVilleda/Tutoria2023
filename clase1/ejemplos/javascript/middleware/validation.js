const jwt = require("jsonwebtoken");

const validations = {}

validations.validate_token = (req, res, next) => {
    console.log("Validando...");
    const token = req.header("x-auth-token")
    console.log(token);
    if (!token) {
        return res.status(401).json({ status: "error", msg: "There's no token..." })
    }
    try {
        const decoded = jwt.verify(token, "clase1", { algorithm: 'RS256' });
        console.log("Decodificado:");
        console.log(decoded);
        req.body.token = decoded.data
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: "error", msg: "Token not valid" });
    }
}

validations.admin = (req, res, next) => {
    const tipo = req.body.token.tipo
    if (tipo == 'ADMIN') {
        next()
    } else {
        return res.status(401).json({ status: "error", msg: "Authorization failed" });
    }
}

validations.user = (req, res, next) => {
    const tipo = req.body.token.tipo
    if (tipo == 'USER') {
        next()
    } else {
        return res.status(401).json({ status: "error", msg: "Authorization failed" });
    }
}

module.exports = validations