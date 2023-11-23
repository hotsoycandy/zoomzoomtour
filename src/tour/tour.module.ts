import { Module, forwardRef } from '@nestjs/common'
import { TourController } from './tour.controller'
import { TourService } from './tour.service'
import { TourRepositoryModule } from './persistence/tour.repository.module'
import { BookModule } from 'src/book/book.module'
import { DayoffModule } from 'src/dayoff/dayoff.module'

@Module({
  imports: [
    TourRepositoryModule,
    forwardRef(() => BookModule),
    forwardRef(() => DayoffModule),
  ],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
