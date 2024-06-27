class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login({ email, password }) {

  }

  async register({ name, email, password }) {
    try {
      const createdUser = await this.userRepository.insert({ name, email, password })

      return {
        statusCode: 201,
        createdUser: createdUser
      }
    } catch (err) {
      return {
        statusCode: 500,
        createdUser: null
      }
    }
  }
}

module.exports = AuthService;