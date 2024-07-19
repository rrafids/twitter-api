const express = require('express');
const app = express();
const PORT = 2000;

// Import dependecy
// Import repository
const UserRepository = require('./src/repository/user');
const ThreadRepository = require('./src/repository/thread');

// Import service
const UserService = require('./src/service/user');
const ThreadService = require('./src/service/thread');

// Import handler
const ThreadHandler = require('./src/handler/thread');
const UserHandler = require('./src/handler/user');

app.use(express.json());

const userRepository = new UserRepository();

const router = express.Router();

// Import router
const authRouter = require('./src/router/auth');

// Use router
router.use('/auth', authRouter)

app.use('/api', router)

// Auth 
// router.use('/files', fileRoutes)

const userService = new UserService(userRepository)
const userHandler = new UserHandler(userService);

// import middleware
const authMiddleware = require('./src/middleware/auth')

// User
app.get('/users', authMiddleware.authenticate, authMiddleware.checkUserIsJavid, userHandler.getAll);

const threadRepository = new ThreadRepository();
const threadService = new ThreadService(threadRepository)
const threadHandler = new ThreadHandler(threadService);

// Threads
app.get('/threads', threadHandler.getAll);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found"
  })
});

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
