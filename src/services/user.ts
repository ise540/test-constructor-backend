import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import TokenService  from './token';

class UserService {
  async registration(email: string, password: string) {
    const isTaken = await User.findOne({ where: { email: email } });
    if (isTaken) {
      throw new Error('Пользователь с такой почтой уже зарегистрирован');
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({ email, password: hashPassword, isActivated: false, activationLink: uuidv4() });
    const tokens = await TokenService.generateTokens({email:user.email, isActivated: user.isActivated, });
    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
        ...tokens,
        user
    }
}
}

export default new UserService();