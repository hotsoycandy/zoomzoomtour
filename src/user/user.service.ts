import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { User } from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(signupParams: {
    email: string
    password: string
  }): Promise<User> {
    const user = this.userRepository.newUser(signupParams)
    await user.hashPassword()
    return await this.userRepository.createUser(user)
  }
}
