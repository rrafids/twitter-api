const express = require('express');
const morgan = require('morgan');
const upload = require('../utils/uploadFile');
const uploadMemory = require('../utils/uploadFileMemory');
const cloudinary = require('../config/cloudinary')
const redisClient = require('../config/redis')
const app = express();

// Import dependecy
// Import repository
const UserRepository = require('./repository/user');
const ThreadRepository = require('./repository/thread');

// Import service
const UserService = require('./service/user');
const ThreadService = require('./service/thread');

// Import handler
const ThreadHandler = require('./handler/thread');
const UserHandler = require('./handler/user');

app.use(express.json());
app.use(morgan('combined'));

const userRepository = new UserRepository();

const router = express.Router();

// Import router
const authRouter = require('./router/auth');

// Use router
router.use('/auth', authRouter)

app.use('/api', router)

// Auth 
// router.use('/files', fileRoutes)

const userService = new UserService(userRepository)
const userHandler = new UserHandler(userService);

// import middleware
const authMiddleware = require('./middleware/auth')

// User
app.get('/users', authMiddleware.authenticate, authMiddleware.checkUserIsJavid, userHandler.getAll);

const threadRepository = new ThreadRepository();
const threadService = new ThreadService(threadRepository)
const threadHandler = new ThreadHandler(threadService);

// Threads
app.get('/threads', threadHandler.getAll);
app.post('/threads', threadHandler.create);

// Files
app.post('/files/local/upload/', upload.single("image"), (req, res) => {
  res.send("success");
})

app.post('/files/cloudinary/upload', uploadMemory.single("image"), async (req, res) => {
  // TODO: upload to cloudinary storage
  try {
    const fileBuffer = req.file?.buffer.toString('base64');
    const fileString = `data:${req.file?.mimetype};base64,${fileBuffer}`;

    const uploadedFile = await cloudinary.uploader.upload(fileString);

    return res.status(201).send({
      message: "succes",
      image: uploadedFile.secure_url
    });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
})

// Redis
app.post('/redis', async (req, res) => {
  const token = req.body.token;
  await redisClient.connect();
  await redisClient.set("user-" + userId, token);
  await redisClient.disconnect();

  res.send("success");
})

app.get('/redis', async (req, res) => {
  await redisClient.connect();
  const token = await redisClient.get("token");
  await redisClient.disconnect();

  res.send({
    "message": "success",
    "token": token
  });
})

// TODO:
// endpoint login save jwt tokennya ke redis
// keynya berdasarkan user id

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found"
  })
});

module.exports = app