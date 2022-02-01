import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Veggie} from '../../entities/veggie.entity';
import {VeggieService} from '../user/veggie.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private veggieService: VeggieService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.veggieService.findOneByCondition({email});
    if (user && bcrypt.compare(password, user.password)) {
      const {password, ...result} = user;
      return result;
    } else {
      return null;
    }
  }
}
