import { Module } from '@nestjs/common'
import { TourModule } from './tour/tour.module'
import { UserModule } from './user/user.module'
import { DatabaseModule } from './infrastructure/database/database.module'

@Module({
  imports: [DatabaseModule, TourModule, UserModule],
})
export class AppModule {}
