import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';
import LoginDto from '../controllers/dto/loginDto';
import HttpException from '../shared/HttpException';
import TokenGenerator from '../shared/TokenGenerator';
// import sequelize from '../database/models';
import { IJWTHeaderDto } from '../controllers/dto/IJWTHeaderDto';

class LoginService {
  private _user: IUser | null;
  public async authentication(loginDto: LoginDto) {
    // if (!loginDto.email || !loginDto.password) {
    //   throw new HttpException(400, 'All fields must be filled');
    // }
    this._user = await User.findOne({
      attributes: ['id', 'username', 'role', 'email', 'password'],
      where: { email: loginDto.email },
    });
    if (!this._user) throw new HttpException(401, 'Incorrect email or password');
    const checkPassword = await bcrypt.compare(loginDto.password, this._user.password);
    if (!checkPassword) throw new HttpException(401, 'Incorrect email or password');
    const jwtHeader: IJWTHeaderDto = { id: this._user.id,
      username: this._user.username,
      role: this._user.role,
      email: this._user.email,
    };
    const tokenGenerator = new TokenGenerator();
    const token = tokenGenerator.generateJWTToken(jwtHeader);
    return { token };
  }
}

export default LoginService;
