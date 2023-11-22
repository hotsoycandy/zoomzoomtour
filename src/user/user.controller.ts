import { pick } from 'lodash'
import { Body, Controller, Post } from '@nestjs/common'
// service
import { UserService } from './user.service'
// dto
import { UserDto } from './dto/user.dto'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'

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

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
    return await this.userService.signin(pick(signinDto, ['email', 'password']))
  }
}
