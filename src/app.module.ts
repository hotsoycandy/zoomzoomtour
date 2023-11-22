import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TourModule } from './tour/tour.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [TourModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
