class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    try {
      const userList = await this.userRepository.findAll()

      return {
        statusCode: 200,
        users: userList
      }
    } catch (err) {

      return {
        statusCode: 500,
        createdUser: null
      }
    }
  }
}

module.exports = UserService;