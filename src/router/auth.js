const AuthHandler = require('./src/handler/auth');
const AuthService = require('./src/service/auth');
const UserRepository = require('./src/repository/user');

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);

const router = express.Router();

router.post('/login', authHandler.login);
router.post('/register', authHandler.register);

module.exports = router;