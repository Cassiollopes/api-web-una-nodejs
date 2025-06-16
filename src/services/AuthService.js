const prisma = require("../db/prismaClient");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

class AuthService {
  async login(loginData) {
    const { email, senha } = loginData;

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        throw new Error("Email ou senha incorretos");
      }

      const isPasswordValid = await compare(senha, usuario.senha);
      if (!isPasswordValid) {
        throw new Error("Email ou senha incorretos");
      }

      const token = jwt.sign({ id: usuario.id, role: usuario.role }, jwtSecret, {
        expiresIn: "1d",
      });

      return { token, user: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role } };
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      if (error.message === "Email ou senha incorretos") {
        throw error;
      }

      throw new Error("Erro ao realizar login");
    }
  }
}

module.exports = new AuthService();
