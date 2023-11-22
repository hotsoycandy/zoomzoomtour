import { User } from './entity/user.entity'

export abstract class UserRepository {
  abstract newUser(createUserParams: { email: string; password: string }): User

  abstract createUser(user: User): Promise<User>
}