import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import TokenService from './token';
import MailService from './mail';
import { ApiError } from '../exeptions/apiError';
import { UserDto } from '../dtos/userDto';
import token from './token';

class UserService {
  async registration(email: string, password: string) {
    const isTaken = await User.findOne({ where: { email: email } });
    if (isTaken) {
      throw ApiError.badRequest('Email is already taken');
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({ email, password: hashPassword, isActivated: false, activationLink: uuidv4() });
    await MailService.sendActivationMail(user.email, `${process.env.API_URL}/api/user/activate/${user.activationLink}`);
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ where: { activationLink } });
    console.log();
    console.log(user);
    if (!user) {
      throw ApiError.badRequest('Wrong activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest('No registered users with such e-mail');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Wrong password');
    }
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user:userDto
    };
  }

  async logout(refreshToken:string) {
    const token = await TokenService.removeToken(refreshToken)
    return token;
  }
}

export default new UserService();
