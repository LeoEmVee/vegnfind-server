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

@Controller('veggie')
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
  async login(
    @Request() req,
    // @Body('userName') userName: string,
    // @Body('password') password: string,
  ) {
    console.log('request', req.body);
    const validatedUser = await this.authService.validateUser(
      req.body.username,
      req.body.password,
    );
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return await this.authService.login(validatedUser);
    // const validated = await this.authService.validateUser(userName, password);
    // if (validated) {
    //   return validated;
    // } else {
    //   throw new UnauthorizedException('Invalid credentials controller');
    // }
  }
}
