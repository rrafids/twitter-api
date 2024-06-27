class ThreadHandler {
  constructor(threadService) {
    this.threadService = threadService;

    this.getAll = this.getAll.bind(this);
  }


  async getAll(req, res) {
    const serviceRes = await this.threadService.getAll()

    res.status(serviceRes.statusCode).send({
      threads: serviceRes.threads
    })
  }
}

module.exports = ThreadHandler;