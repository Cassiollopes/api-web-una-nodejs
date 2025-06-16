const authService = require('../services/AuthService');

class AuthController {
  async login(req, res) {
    try {
      const result = await authService.login(req.body);

      res.cookie("auth-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
      });
    } catch (error) {
      res.status(401).json({ 
        success: false,
        message: error.message,
      });
    }
  }

   async logout(req, res) {
    try {
      res.clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      
      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao fazer logout',
      });
    }
  }
}

module.exports = new AuthController();
