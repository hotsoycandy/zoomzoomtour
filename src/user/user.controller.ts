import { pick } from 'lodash'
import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { SignupDto } from './dto/signup.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<UserDto> {
    const user = await this.userService.signup(
      pick(signupDto, ['email', 'password']),
    )
    return UserDto.from(user)
  }
}
