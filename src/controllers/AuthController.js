import AuthService from "../services/AuthService.js";

class AuthController {

  constructor() {
    this.authService = new AuthService()
  }

  async signUp(req, res, next) {
      const data = await this.authService.signUp(req, res, next);
      if (data) {
        res.status(data.statusCode).json(data);
      }
  }

  async signIn(req, res, next) {
    const data = await this.authService.signIn(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async userInfo(req, res, next) {
    const data = await this.authService.userInfo(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }
}

export default AuthController;