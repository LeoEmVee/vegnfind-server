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
import {JwtService} from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private readonly veggieService: VeggieService,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: Veggie) {
    return this.veggieService.createOne(user);
  }

  @Post('validate')
  async validate(@Body() data: any) {
    return this.jwtService.decode(data.access_token);
  }

  // @UseGuards(LocalAuthGuard) // Local guard keeps the route accessible only through validation
  @Post('login')
  async login(@Body() user: any) {
    try {
      const validated = await this.authService.validateUser(
        user.username,
        user.password,
      );
      const payload = {user};
      const token = {access_token: await this.jwtService.sign(payload)};
      return validated && token;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials!');
    }
  }
}
