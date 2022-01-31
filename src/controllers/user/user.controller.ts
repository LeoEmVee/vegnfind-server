import {Body, Controller, Post} from '@nestjs/common';
import {User} from 'src/entities/user.entity';
import {UserService} from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createNewUser(@Body() data: User) {
    const user = {...new User(), ...data};
    // const user = data;
    console.log(user);
    return this.userService.create(user);
  }
}
