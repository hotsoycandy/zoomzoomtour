import { Reflector } from '@nestjs/core'
import {
  INestApplication,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common'

export function setNestApp<NestApp extends INestApplication>(
  app: NestApp,
): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
}
