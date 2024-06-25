const express = require('express');
const app = express();
const PORT = 2000;

// Import dependecy
// Import repository
const UserRepository = require('./src/repository/user');

// Import service
const AuthService = require('./src/service/auth');
const UserService = require('./src/service/user');

// Import handler
const AuthHandler = require('./src/handler/auth');
const UserHandler = require('./src/handler/user');

app.use(express.json());

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);

// Auth 
app.post('/auth/login', authHandler.login);
app.post('/auth/register', authHandler.register);

const userService = new UserService(userRepository)
const userHandler = new UserHandler(userService);

// User
app.get('/users', userHandler.getAll);

app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found"
  })
});

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
