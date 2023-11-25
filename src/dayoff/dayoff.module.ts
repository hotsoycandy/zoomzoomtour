import { Module, forwardRef } from '@nestjs/common'
import { DayoffService } from './dayoff.service'
import { DayoffRepositoryModule } from './persistence/dayoff.repository.module'
import { TourModule } from 'src/tour/tour.module'
import { RedisModule } from 'src/infrastructure/redis/redis.module'

@Module({
  imports: [DayoffRepositoryModule, RedisModule, forwardRef(() => TourModule)],
  providers: [DayoffService],
  exports: [DayoffService],
})
export class DayoffModule {}
