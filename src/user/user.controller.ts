import { pick } from 'lodash'
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { RequestWithUser } from 'src/infrastructure/server/auth/auth'
import { LocalAuthGuard } from 'src/infrastructure/server/auth/local-auth.guard'
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

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req: RequestWithUser): Promise<{
    access_token: string
  }> {
    return await this.userService.createJwtToken(req.user)
  }
}
