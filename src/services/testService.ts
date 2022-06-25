import { ApiError } from '../exeptions/apiError';
import { Test } from '../models/Test';

class TestService {
  async create(title: string, userId: string) {
    const test = await Test.create({ title, authorId: userId });
    console.log(test);
    return test;
  }

  async getAll(userId: string) {
    const testList = await Test.findAll({ where: { authorId: userId } });
    return testList ?? [];
  }

  async getById(testId: string, userId: string) {
    const test = await Test.findOne({ where: { id: testId, authorId: userId } });
    return test;
  }

  async update(testId: string, userId: string, data: { title: string }) {
    const test = await Test.findOne({ where: { id: testId, authorId: userId } });
    if (!test) throw ApiError.notFound('Test');
    test.title = data.title;
    test.save();
    return test;
  }

  async delete(testId: string, userId: string) {
    const deletedTest = await Test.destroy({ where: { id: testId, authorId: userId } });
    return deletedTest;
  }
}

export default new TestService();
