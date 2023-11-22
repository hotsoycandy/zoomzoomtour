import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRepositoryModule } from './persistence/user.repository.module'
import { CustomJwtModule } from 'src/infrastructure/server/custom-jwt.module'

@Module({
  imports: [UserRepositoryModule, CustomJwtModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
