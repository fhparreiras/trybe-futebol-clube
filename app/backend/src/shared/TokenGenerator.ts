import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';
import HttpException from './HttpException';

const SECRET = process.env.SECRET || 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig: SignOptions = jwtDefaultConfig) {
  }

  public generateJWTToken(payload: IJWTHeaderDto) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const introspection = verify(token, SECRET, this.jwtConfig);
      // if (!introspection) {
      //   throw new HttpException(401, 'token inválido');
      // }
      return introspection;
    } catch (e) {
      // return e;
      throw new HttpException(401, 'Token inválido');
    }
  }
}

export default TokenGenerator;
