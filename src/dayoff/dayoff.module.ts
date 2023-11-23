import { Module } from '@nestjs/common';
import { DayoffService } from './dayoff.service';

@Module({
  providers: [DayoffService]
})
export class DayoffModule {}
