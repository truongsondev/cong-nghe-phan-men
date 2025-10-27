import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

class JWTClient {
  createTokenPair = async (
    privateKey: string,
    payload: object,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
      } as SignOptions);

      const refreshToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
      } as SignOptions);

      return { accessToken, refreshToken };
    } catch (err) {
      throw new Error(`Error creating token pair: ${err}`);
    }
  };

  verifyToken = async (token: string, secretOrPublicKey: string) => {
    try {
      return jwt.verify(token, secretOrPublicKey);
    } catch (err) {
      throw new Error(`Invalid token: ${err}`);
    }
  };
}

export default JWTClient;
