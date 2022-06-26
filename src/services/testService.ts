import { ApiError } from '../exeptions/apiError';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { Test } from '../models/Test';

class TestService {
  async create(title: string, questionsList: Question[], userId: string) {
    const test = await Test.create({ title, authorId: userId });
    questionsList.forEach((question) => (question.testId = test.id));
    const questions = await Question.bulkCreate(questionsList);
    
    for (let i = 0; i < questions.length; i++) {
      questionsList[i].answers.forEach((answer) => {
        answer.questionId = questions[i].id;
      });
    }
    
    for(let question of questionsList) {
      await Answer.bulkCreate(question.answers)
    }

    return test;
  }

  async getAll(userId: string) {
    const testList = await Test.findAll({ where: { authorId: userId }, include: Question });
    return testList ?? [];
  }

  async getById(testId: string, userId: string) {
    const test = await Test.findOne({ where: { id: testId, authorId: userId }, include: Question });
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
