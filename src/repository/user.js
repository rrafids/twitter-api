const { User } = require('../../models')

class UserRepository {
  constructor() { }

  async findAll() {
    const userList = await User.findAll();

    return userList;
  }

  async insert(user) {
    const createdUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password
    });

    return createdUser;
  }

  async getByEmail(email) { }
}

module.exports = UserRepository;