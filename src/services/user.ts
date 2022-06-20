import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import TokenService from './token';
import MailService from './mail';
import { ApiError } from '../exeptions/apiError';

class UserService {
  async registration(email: string, password: string) {
    const isTaken = await User.findOne({ where: { email: email } });
    if (isTaken) {
      throw ApiError.badRequest("Email is already taken");
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({ email, password: hashPassword, isActivated: false, activationLink: uuidv4() });
    await MailService.sendActivationMail(user.email, `${process.env.API_URL}/api/user/activate/${user.activationLink}`);
    const tokens = await TokenService.generateTokens({ email: user.email, isActivated: user.isActivated });
    await TokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user
    };
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ where: { activationLink } });
    console.log();
    console.log(user);
    if (!user) {
      throw ApiError.badRequest("Wrong activation link");
    }
    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
