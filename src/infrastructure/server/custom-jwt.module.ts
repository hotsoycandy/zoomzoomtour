import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class CustomJwtModule {}
