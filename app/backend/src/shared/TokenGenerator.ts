import { sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';
import HttpException from './HttpException';

const SECRET = process.env.SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '1500m',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig: SignOptions = jwtDefaultConfig) {
  }

  public generateJWTToken(payload: IJWTHeaderDto) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public authenticateToken = (token: string) => {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }
    try {
      // console.log('começou o try do decoded');
      const decoded = verify(token, SECRET, this.jwtConfig);
      // console.log('decoded: ', decoded);
      return decoded;
    } catch (e) {
      throw new HttpException(401, 'Token must be a valid token');
    }
  };
}

export default TokenGenerator;
