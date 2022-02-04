import {Injectable, UnauthorizedException} from '@nestjs/common';
import {VeggieService} from '../user/veggie.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Payload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private veggieService: VeggieService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.veggieService.findOneByCondition({
      username: username,
    });
    if (user && bcrypt.compare(password, user.password)) {
      const {password, ...result} = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials!');
    }
  }

  async login(user: any) {
    const payload = {user};
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
