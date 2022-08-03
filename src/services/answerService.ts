import { Answer } from '../models/Answer';
import { CompletedTest } from '../models/CompletedTest';
import { Question } from '../models/Question';
import { UserAnswer } from '../models/UserAnswer';
import { QuestionTypes } from '../types/QuestionTypes';

class AnswerService {
  async sendAnswer(userId: string, testId: string, answerId: string, value: string) {
    const answer = await Answer.findByPk(answerId);
    const question = await Question.findByPk(answer?.questionId);

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

  async submit(userId: string, testId: string) {
    const userAnswerList = await this.getAllAnswers(userId, testId);
    const completedTest = { userId, testId, right: 0, wrong: 0 };
    const userQuestions = [...new Set(userAnswerList.map((item) => item.questionId))];

    for (let questionId of userQuestions) {
      const question = await Question.findByPk(questionId);
      if (question && question.type === QuestionTypes.CHECKBOX) {
        const correctAnswers = await Answer.findAll({ where: { questionId: question.id, correct: true } });
        const correctAnswersIds = correctAnswers.map((item) => item.id);
        const filteredAnswers = userAnswerList.filter((item) => {
          if (correctAnswersIds.includes(item.answerId)) return false;
          else return true;
        });

        const userAnswers = userAnswerList.filter((item) => item.questionId === questionId);

        if (
          filteredAnswers.map((item) => item.questionId).includes(questionId) ||
          correctAnswers.length !== userAnswers.length
        ) {
          completedTest.wrong++;
        } else {
          completedTest.right++;
        }
      } else {
        const correctAnswer = await Answer.findOne({ where: { questionId: questionId, correct: true } });
        const userAnswer = userAnswerList.find((item) => item.questionId === questionId);
        if (correctAnswer && userAnswer && userAnswer.value.toLowerCase() === correctAnswer.value.toLowerCase())
          completedTest.right++;
        else completedTest.wrong++;
      }
    }

    const result = await CompletedTest.create(completedTest);

    return result;
  }
}

export default new AnswerService();
