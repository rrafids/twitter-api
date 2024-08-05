const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONST = require('../constant/constant')

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login({ email, password }) {
    // TODO: get user by email
    // check password
    const user = await this.userRepository.getByEmail(email);

    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      // TODO: generate jwt token
      const token = jwt.sign(
        {
          email: user.email,
        },
        CONST.JWT.SECRET,
        {
          expiresIn: CONST.JWT.EXPIRE_TIME,
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

      // TODO: integrate with nodemailer


      return {
        statusCode: 201,
        message: "User registered successfully",
        createdUser: createdUser
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: err.errors,
        createdUser: null
      }
    }
  }
}

module.exports = AuthService;