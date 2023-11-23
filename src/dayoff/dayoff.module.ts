import { Module } from '@nestjs/common'
import { DayoffService } from './dayoff.service'

@Module({
  providers: [DayoffService],
  exports: [DayoffService],
})
export class DayoffModule {}
