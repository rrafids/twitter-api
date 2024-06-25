class AuthHandler {
  constructor(userService) {
    this.userService = userService;

    this.getAll = this.getAll.bind(this);
  }


  async getAll(req, res) {
    const serviceRes = await this.userService.getAll()

    res.status(serviceRes.statusCode).send({
      users: serviceRes.users
    })
  }
}

module.exports = AuthHandler;