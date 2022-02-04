import {
  Post,
  Body,
  Controller,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import {AuthService} from '../../services/auth/auth.service';
import {Veggie} from '../../entities/veggie.entity';
import {VeggieService} from 'src/services/user/veggie.service';
import {LocalAuthGuard} from '../../auth/local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly veggieService: VeggieService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user: Veggie) {
    return this.veggieService.createOne(user);
  }

  @UseGuards(LocalAuthGuard) // Local guard keeps the route accessible only through validation
  @Post('login')
  async login(@Request() user) {
    return await this.authService.login(user);
  }
}
