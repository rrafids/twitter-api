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

  async insert(thread) {
    const createdThread = await Thread.create({
      user_id: thread.userId,
      category_id: thread.categoryId,
      title: thread.title,
      content: thread.content,
      image: thread.image
    });

    return createdThread;
  }
}

module.exports = ThreadRepository;