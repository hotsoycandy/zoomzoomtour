import { Module } from '@nestjs/common'
import { TourController } from './tour.controller'
import { TourService } from './tour.service'
import { TourRepositoryModule } from './persistence/tour.repository.module'

@Module({
  imports: [TourRepositoryModule],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
