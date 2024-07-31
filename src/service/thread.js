class ThreadService {
  constructor(threadRepository) {
    this.threadRepository = threadRepository;
  }

  async getAll() {
    try {
      const threadList = await this.threadRepository.findAll()

      return {
        statusCode: 200,
        threads: threadList
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        threads: []
      }
    }
  }

  async create({ userId, categoryId, title, content, image }) {
    try {
      const createdThread = await this.threadRepository.insert({ userId, categoryId, title, content, image })

      return {
        statusCode: 201,
        createdThread: createdThread
      }
    } catch (err) {
      return {
        statusCode: 500,
        createdThread: null
      }
    }
  }
}

module.exports = ThreadService;