import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // super({usernameField: 'email'}) // IF WANT TO USE EMAIL INSTEAD OF USERNAME
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser(username, password);

    // this return will be attached to req.user in the controller
  }
}
