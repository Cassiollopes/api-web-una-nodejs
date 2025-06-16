const postService = require("../services/PostService");

class PostController {
  async buscarPosts(req, res) {
    try {
      const posts = await postService.buscarPosts();

      res.status(200).json({
        success: true,
        message: "Posts encontrados com sucesso",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async criarPost(req, res) {
    try {
      const post = await postService.criarPost(req.user, {
        ...req.body,
        imagem: req.files?.imagem?.tempFilePath,
      });

      res.status(201).json({
        success: true,
        message: "Post criado com sucesso",
        data: post,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PostController();
