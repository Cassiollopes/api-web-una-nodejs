const usuarioService = require("../services/UsuarioService");

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const usuario = await usuarioService.criarUsuario(req.body);

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        data: usuario,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async meuPerfil(req, res) {
    try {
      const usuario = await usuarioService.meuPerfil(req.user.id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: "Perfil do usuário encontrado",
        data: usuario,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async atualizarPerfil(req, res) {
    try {
      const usuario = await usuarioService.atualizarPerfil(req.user.id, req.files?.imagem?.tempFilePath, req.body.senha);

      res.status(200).json({
        success: true,
        message: "Perfil atualizado com sucesso",
        data: usuario,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UsuarioController();
