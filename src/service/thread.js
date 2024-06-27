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
}

module.exports = ThreadService;