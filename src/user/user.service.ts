import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from './user.repository'
import { User } from './entity/user.entity'
import { pick } from 'lodash'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupParams: {
    email: string
    password: string
  }): Promise<User> {
    const user = this.userRepository.newUser(signupParams)
    await user.hashPassword()
    return await this.userRepository.createUser(user)
  }

  async signin(singinParams: {
    email: string
    password: string
  }): Promise<{ token: string }> {
    const { email, password } = singinParams

    const user = await this.userRepository.getUser({
      email,
    })
    if (user === null || !(await user.checkPassword(password))) {
      throw new UnauthorizedException('email and password are not correct')
    }
    return {
      token: await this.jwtService.signAsync({ email: user.email }),
    }
  }

  async getUser(getUserParams: { idx: number }): Promise<User | null> {
    return await this.userRepository.getUser(pick(getUserParams, ['idx']))
  }
}
