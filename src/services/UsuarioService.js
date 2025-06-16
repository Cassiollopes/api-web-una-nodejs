const prisma = require('../db/prismaClient');
const bcrypt = require('bcrypt');
const postService = require('./PostService');

class UsuarioService { 
  async criarUsuario(usuarioData) {
    try {
      usuarioData.senha = await bcrypt.hash(usuarioData.senha, 10);

      const usuario = await prisma.usuario.create({
        data: usuarioData,
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      return usuario;
    }catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  async atualizarPerfil(id, imagem, senha) {
    try {
      if (senha) {
        senha = await bcrypt.hash(senha, 10);

        await prisma.usuario.update({
          where: { id },
          data: { senha }
        });
      }
      
      let imageUrl = null;
      if (imagem) {
        imageUrl = await postService.uploadImageToCloudinary(imagem);

        await prisma.usuario.update({
          where: { id },
          data: { imageUrl }
        });
      }

      return await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nome: true,
          email: true,
          imageUrl: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      console.error('Erro ao adicionar imagem de perfil:', error);
      throw new Error('Erro ao adicionar imagem de perfil');
    }
  }

  async meuPerfil(id) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nome: true,
          matricula: true,
          email: true,
          campus: true,
          curso: true,
          role: true,
        }
      });

      return usuario;
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw new Error('Erro ao buscar perfil do usuário');
    }
  }
}

module.exports = new UsuarioService();