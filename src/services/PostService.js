const prisma = require("../db/prismaClient");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class PostService {
  async buscarPosts() {
    try {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          autor: {
            select: {
              id: true,
              nome: true,
              imageUrl: true,
            },
          },
          titulo: true,
          descricao: true,
          imageUrl: true,
          link: true,
          data: true,
          local: true,
          modalidade: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return posts;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      throw new Error("Erro ao buscar posts");
    }
  }

  async criarPost(autor, postData) {
    const { imagem, ...restPostData } = postData;
    
    try {
      if (autor.role === "Aluno") {
        throw new Error("Sem permissão para criar posts");
      }

      const user = await prisma.usuario.findUnique({
        where: { id: autor.id },
        select: { id: true },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      let imageUrl = null;
      if (imagem) {
        imageUrl = await this.uploadImageToCloudinary(imagem);
      }

      const post = await prisma.post.create({
        data: {
          autorId: user.id,
          ...restPostData,
          imageUrl: imageUrl,
        },
        select: {
          id: true,
          titulo: true,
          descricao: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return post;
    } catch (error) {
      console.error("Erro ao criar post:", error);
      throw new Error("Erro ao criar post");
    }
  }

  async uploadImageToCloudinary(imagePath) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "Posts Web Una",
      });

      return result.secure_url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw new Error("Erro ao fazer upload da imagem");
    }
  }
}

module.exports = new PostService();
