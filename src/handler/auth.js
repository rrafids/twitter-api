class AuthHandler {
  constructor(authService) {
    this.authService = authService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) { }

  async register(req, res) {
    const payload = req.body;
    const serviceRes = await this.authService.register(payload)

    res.status(serviceRes.statusCode).send({
      created_user: serviceRes.createdUser
    })
  }
}

module.exports = AuthHandler;