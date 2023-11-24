import { Module, forwardRef } from '@nestjs/common'
import { TourController } from './tour.controller'
import { TourService } from './tour.service'
import { BookModule } from 'src/book/book.module'
import { DayoffModule } from 'src/dayoff/dayoff.module'
import { RedisModule } from 'src/infrastructure/redis/redis.module'
import { TourRepositoryModule } from './persistence/tour.repository.module'

@Module({
  imports: [
    TourRepositoryModule,
    RedisModule,
    forwardRef(() => DayoffModule),
    forwardRef(() => BookModule),
  ],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
