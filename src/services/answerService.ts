import { Answer } from '../models/Answer';
import { CompletedTest } from '../models/CompletedTest';
import { UserAnswer } from '../models/UserAnswer';

class AnswerService {
  async sendAnswer(userId: string, testId: string, answerId: string, value: string) {
    const answer = await UserAnswer.create({ userId, testId, answerId, value });
    return answer;
  }

 async getAllAnswers(userId:string, testId:string) {
    const answerList = await UserAnswer.findAll({where:{testId, userId}})
    return answerList;
 }

 async getResult(userId:string, testId:string) {
    const userAnswerList = await this.getAllAnswers(userId, testId);
    const completedTest = await CompletedTest.create({userId, testId, right:0, wrong:0});
    
    for(let userAnswer of userAnswerList) {
       const answer = await Answer.findOne({where:{id:userAnswer.answerId}})
       if (answer && answer.correct) completedTest.right++;
       else completedTest.wrong++
    }

    completedTest.save();
    
    return completedTest;
 }

}

export default new AnswerService();
