import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
// strategies
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from 'src/user/user.module'
import { CustomJwtModule } from './custom-jwt.module'

@Module({
  imports: [UserModule, PassportModule, CustomJwtModule],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
