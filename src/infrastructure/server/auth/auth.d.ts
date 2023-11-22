import { Request } from 'express'
import { User } from 'src/user/entity/user.entity'

export interface JwtPayload {
  idx: number
  email: string
}

type RequestWithUser = Request & { user: User }
