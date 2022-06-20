import jwt from 'jsonwebtoken';
import { UserToken } from '../models/UserToken';

class TokenService {
  async generateTokens(payload: {}) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await UserToken.findOne({ where: { userId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await UserToken.create({ userId, refreshToken });
    return token;
  }
}

export default new TokenService();