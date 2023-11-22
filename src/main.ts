import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setNestApp } from './infrastructure/server/set-nest-app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  setNestApp(app)
  await app.listen(3000)
}
bootstrap()
