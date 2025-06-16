const validateUsuario = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Corpo da requisição está vazio ou mal formatado",
    });
  }

  const { nome, email, senha, curso, campus, matricula } = req.body;
  const errors = [];

  // Validação de campos obrigatórios
  if (!nome?.trim()) errors.push("Nome é obrigatório");
  if (!email?.trim()) errors.push("Email é obrigatório");
  if (!senha?.trim()) errors.push("Senha é obrigatória");
  if (!curso) errors.push("Curso é obrigatório");
  if (!campus) errors.push("Campus é obrigatório");
  if (!matricula?.trim()) errors.push("Matrícula é obrigatória");

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Email deve ter um formato válido");
  }

  // Validação de senha
  if (senha && senha.length < 6) {
    errors.push("Senha deve ter pelo menos 6 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
      errors: errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Corpo da requisição está vazio ou mal formatado",
    });
  }

  const { email, senha } = req.body;
  const errors = [];

  // Validação de campos obrigatórios
  if (!email?.trim()) errors.push("Email é obrigatório");
  if (!senha?.trim()) errors.push("Senha é obrigatória");

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Email deve ter um formato válido");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateUsuario,
  validateLogin,
};
