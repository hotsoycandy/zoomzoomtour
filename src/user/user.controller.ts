import { pick } from 'lodash'
import { Controller } from '@nestjs/common'
import { UserService } from './user.service'
import { SignupDto } from './dto/signup.dto'
import { UserDto } from './dto/user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async signup(signupDto: SignupDto): Promise<UserDto> {
    const user = await this.userService.signup(
      pick(signupDto, ['email', 'password']),
    )
    return UserDto.from(user)
  }
}
