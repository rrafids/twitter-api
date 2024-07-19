const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(userRepository, briApiRepositiry) {
    this.userRepository = userRepository;
    briApiRepositiry
  }

  async login({ email, password }) {
    // TODO: get user by email
    // check password
    const user = await this.userRepository.getByEmail(email);

    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      // TODO: generate jwt token
      // payloadnya: email
      const jwtSecret = 'SECRET';
      const jwtExpireTime = '24h';

      const token = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );

      return {
        statusCode: 200,
        message: "Login berhasil",
        token: token
      }
    }

    return {
      statusCode: 400,
      message: "Login gagal",
      token: null
    }
  }

  async register({ name, email, password }) {
    try {
      const salt = 10;
      const encryptedPassword = bcrypt.hashSync(password, salt)

      const createdUser = await this.userRepository.insert({ name, email, password: encryptedPassword })

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