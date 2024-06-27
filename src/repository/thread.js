const { User, Thread, Category } = require('../../models')

class ThreadRepository {
  constructor() { }

  async findAll() {
    const threadList = await Thread.findAll(
      {
        // attributes: ['id', 'title', 'content'],
        include: [
          {
            model: User,
            required: true,
            as: "user",
            // attributes: ['name']
          },
          {
            model: Category,
            required: true,
            as: "category",
            // attributes: ['name']
          }
        ]
      }
    );

    return threadList;
  }
}

module.exports = ThreadRepository;