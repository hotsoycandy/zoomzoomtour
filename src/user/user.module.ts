import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRepositoryModule } from './persistence/user.repository.module'
import { AuthModule } from 'src/infrastructure/server/auth/auth.module'

@Module({
  imports: [UserRepositoryModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
