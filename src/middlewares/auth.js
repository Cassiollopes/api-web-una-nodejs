const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies['auth-token'];

    if (!token) {
      return res.status(401).json({
        authenticated: false,
        message: "Acesso negado. Token não fornecido.",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
      message: "Token inválido ou expirado",
    });
  }
};

module.exports = {
  verifyToken,
};