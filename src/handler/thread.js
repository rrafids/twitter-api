class ThreadHandler {
  constructor(threadService) {
    this.threadService = threadService;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }


  async getAll(req, res) {
    const serviceRes = await this.threadService.getAll()

    res.status(serviceRes.statusCode).send({
      threads: serviceRes.threads
    })
  }

  async create(req, res) {
    const payload = req.body;

    const serviceRes = await this.threadService.create({
      userId: payload.user_id,
      categoryId: payload.category_id,
      title: payload.title,
      content: payload.content,
      image: payload.image,
    })

    res.status(serviceRes.statusCode).send({
      created_thread: serviceRes.createdThread
    })
  }
}

module.exports = ThreadHandler;