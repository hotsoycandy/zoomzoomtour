import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import { UserRepository } from '../user.repository'
import { UserRepositoryMysql } from './user.repository-mysql'

const userRepositoryMysqlProviders: Provider[] = [
  UserRepositoryMysql,
  {
    provide: UserRepository,
    useExisting: UserRepositoryMysql,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...userRepositoryMysqlProviders],
  exports: [...userRepositoryMysqlProviders],
})
export class UserRepositoryModule {}
