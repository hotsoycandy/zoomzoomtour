import { Module } from '@nestjs/common'
import { DayoffService } from './dayoff.service'
import { DayoffRepositoryModule } from './persistence/dayoff.repository.module'

@Module({
  imports: [DayoffRepositoryModule],
  providers: [DayoffService],
  exports: [DayoffService],
})
export class DayoffModule {}
