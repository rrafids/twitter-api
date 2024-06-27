const { User, Thread, Category } = require('../../models')

class ThreadRepository {
  constructor() { }

  async findAll() {
    const threadList = await Thread.findAll(
      {
        include: [
          {
            model: User,
            required: true,
            as: "user"
          },
          {
            model: Category,
            required: true,
            as: "category"
          }
        ]
      }
    );

    return threadList;
  }
}

module.exports = ThreadRepository;