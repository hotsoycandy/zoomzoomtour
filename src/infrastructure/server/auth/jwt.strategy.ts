import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/user/entity/user.entity'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from './auth'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUser({ idx: payload.idx })
    if (user === null) {
      throw new UnauthorizedException()
    }
    return user
  }
}
