import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
// strategies
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { ConfigService } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
