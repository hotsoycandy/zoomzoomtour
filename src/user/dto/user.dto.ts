import { pick } from 'lodash'
import { User } from '../entity/user.entity'

export class UserDto {
  public idx!: number
  public email!: string

  static from(user: User): UserDto {
    const userDto = new UserDto()
    Object.assign(userDto, pick(user, ['email']))
    return userDto
  }
}
