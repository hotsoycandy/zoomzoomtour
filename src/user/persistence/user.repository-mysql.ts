import { pick } from 'lodash'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRepository } from '../user.repository'
import { User } from '../entity/user.entity'

@Injectable()
export class UserRepositoryMysql implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  newUser(createUserParams: { email: string; password: string }): User {
    return this.userRepository.create(
      pick(createUserParams, ['email', 'password']),
    )
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }

  async getUser(findUserParams: {
    idx?: number
    email?: string
    password?: string
  }): Promise<User | null> {
    return await this.userRepository.findOne({
      where: pick(findUserParams, ['idx', 'email', 'password']),
    })
  }
}
