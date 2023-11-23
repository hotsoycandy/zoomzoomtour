import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TourModule } from './tour/tour.module'
import { UserModule } from './user/user.module'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './infrastructure/server/auth/auth.module'
import { BookModule } from './book/book.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TourModule,
    UserModule,
    BookModule,
  ],
})
export class AppModule {}
