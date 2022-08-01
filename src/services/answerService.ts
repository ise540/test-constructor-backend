import { Answer } from '../models/Answer';
import { CompletedTest } from '../models/CompletedTest';
import { Question } from '../models/Question';
import { UserAnswer } from '../models/UserAnswer';
import { QuestionTypes } from '../types/QuestionTypes';

class AnswerService {
  async sendAnswer(userId: string, testId: string, answerId: string, value: string) {
    const answer = await Answer.findByPk(answerId);
    const question = await Question.findByPk(answer?.questionId);
    console.log('=============================');
    console.log(question);
    console.log('=============================');
    switch (question?.type) {
      case QuestionTypes.CHECKBOX: {
        const previousAnswer = await UserAnswer.findOne({ where: { answerId } });
        if (!previousAnswer) {
          await UserAnswer.create({ userId, testId, answerId, value, questionId: question.id });
        } else {
          await UserAnswer.destroy({ where: { userId, testId, answerId } });
        }
        return;
      }
      case QuestionTypes.RADIO: {
        await UserAnswer.destroy({ where: { userId, testId, questionId: question.id } });
        await UserAnswer.create({ userId, testId, answerId, value, questionId: question.id });

        return;
      }

      case QuestionTypes.TEXT: {
        const currentAnswer = await UserAnswer.findOne({ where: { userId, testId, answerId } });
        if (!currentAnswer) {
          await UserAnswer.create({ userId, testId, answerId, value, questionId: question.id });
        } else {
          currentAnswer.value = value;
          currentAnswer.save();
          return;
        }
      }
    }
  }

  async getAllAnswers(userId: string, testId: string) {
    const answerList = await UserAnswer.findAll({ where: { testId, userId } });
    return answerList;
  }

  async submitTestAnswers(userId: string, testId: string) {
    const userAnswerList = await this.getAllAnswers(userId, testId);
    const completedTest = await CompletedTest.create({ userId, testId, right: 0, wrong: 0 });

    for (let userAnswer of userAnswerList) {
      const answer = await Answer.findOne({ where: { id: userAnswer.answerId } });
      if (answer && answer.correct) completedTest.right++;
      else completedTest.wrong++;
    }

    completedTest.save();

    return completedTest;
  }
}

export default new AnswerService();
