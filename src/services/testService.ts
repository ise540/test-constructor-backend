import { ApiError } from '../exeptions/apiError';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { Test } from '../models/Test';

interface ITestInfo {
  id: string;
  title: string;
  authorId: string;
  questions: Question[];
}
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

    for (let question of questionsList) {
      await Answer.bulkCreate(question.answers);
    }

    return test;
  }


  async getAll(userId: string) {
    const testList = await Test.findAll({
      where: { authorId: userId },
      include: [{ model: Question, include: [Answer] }]
    });
    return testList ?? [];
  }


  async getById(testId: string, userId: string) {
    const test = await Test.findOne({
      where: { id: testId, authorId: userId },
      include: [{ model: Question, include: [Answer] }]
    });
    return test;
  }


  async update(testId: string, userId: string, updatedTest: Test) {
    const oldTest = await Test.findOne({
      where: { id: testId, authorId: userId },
      include: [{ model: Question, include: [Answer] }]
    });

    if (!oldTest) return;

    if (updatedTest.title !== oldTest.title) {
      oldTest.title = updatedTest.title;
      oldTest.save();
    }

    for (let question of updatedTest.questions) {
      if (!question.id) {
        question.testId = oldTest.id;
        const createdQuestion = await Question.create(question);
        for (let answer of question.answers) {
          answer.questionId = createdQuestion.id;
          await Answer.create(answer);
        }
      }
    }

    const idListQuestionsOld = updatedTest.questions.map((item) => {
      return item.id;
    });

    for (let question of oldTest.questions) {
      if (!idListQuestionsOld.includes(question.id)) {

        for (let answer of question.answers) {
          await Answer.destroy({ where: { id: answer.id } });
        }
        await Question.destroy({ where: { id: question.id } });
      }
    }

    return oldTest;
  }

  
  async delete(testId: string, userId: string) {
    const deletingTest = await Test.findOne({
      where: { id: testId, authorId: userId },
      include: [{ model: Question, include: [Answer] }]
    });

    if(!deletingTest) return ApiError.notFound("Test");

    for (let question of deletingTest.questions) {
        for (let answer of question.answers) {
          await Answer.destroy({ where: { id: answer.id } });
        }
        await Question.destroy({ where: { id: question.id } });
      
    }
    const deletedTest = await Test.destroy({where: {id: testId, authorId:userId}})
    

    return deletedTest;
  }
}

export default new TestService();
