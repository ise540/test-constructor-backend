import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import TokenService from './tokenService';
import MailService from './mailService';
import { ApiError } from '../exeptions/apiError';
import { UserDto } from '../dtos/userDto';
import type { JwtPayload } from 'jsonwebtoken';

class UserService {
  async registration(email: string, password: string) {
    const isTaken = await User.findOne({ where: { email: email } });
    if (isTaken) {
      throw ApiError.badRequest('Email is already taken');
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({
      email,
      password: hashPassword,
      isActivated: false,
      activationLink: uuidv4(),
      resetPassLink: ''
    });
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
      user: userDto
    };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = (await TokenService.validateRefreshToken(refreshToken)) as JwtPayload;
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findByPk(userData.id);

    if (!user) throw ApiError.notFound('User');

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }

  async resetPassword(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.notFound('User');
    }
    user.resetPassLink = uuidv4();
    await user.save();
    await MailService.sendResetPasswordMail(
      user.email,
      `${process.env.FRONTEND_URL}/reset/${user.resetPassLink}`
    );
    const userDto = new UserDto(user);
    return userDto;
  }

  async setNewPassword(resetPassLink:string, newPassword:string) {
    const user = await User.findOne({ where: { resetPassLink } });
    if (!user) {
      throw ApiError.notFound('User');
    }
    const hashPassword = await bcrypt.hash(newPassword, 4);
    user.password = hashPassword;
    user.resetPassLink = null;
    await user.save();
    const userDto = new UserDto(user);
    return userDto;
  }
}

export default new UserService();
