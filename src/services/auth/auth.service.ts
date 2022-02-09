import {Injectable, UnauthorizedException} from '@nestjs/common';
import {VeggieService} from '../user/veggie.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Payload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private veggieService: VeggieService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.veggieService.findOneByCondition({
        username: username,
      });
      const valid = await bcrypt.compare(password, user.password);

      const result = {...user, password: null};
      return valid && result;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials!');
    }
  }
}
