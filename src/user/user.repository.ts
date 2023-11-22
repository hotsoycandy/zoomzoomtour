import { User } from './entity/user.entity'

export abstract class UserRepository {
  abstract newUser(createUserParams: { email: string; password: string }): User

  abstract createUser(user: User): Promise<User>

  abstract getUser(findUserParams: {
    idx?: number
    email?: string
    password?: string
  }): Promise<User | null>
}
