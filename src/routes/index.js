const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');
const postController = require('../controllers/PostController');
const AuthController = require('../controllers/AuthController');
const { validateUsuario, validateLogin } = require('../middlewares/validation');
const { verifyToken } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/posts', verifyToken, postController.criarPost);
router.get('/posts', postController.buscarPosts);

router.post("/usuarios", validateUsuario, usuarioController.criarUsuario);
router.get("/meu-perfil", verifyToken, usuarioController.meuPerfil);
router.post("/atualizar-perfil", verifyToken, usuarioController.atualizarPerfil);

router.post('/login', validateLogin, AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/verificar-token', verifyToken, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "Token válido",
    user: req.user,
  });
});


module.exports = router;