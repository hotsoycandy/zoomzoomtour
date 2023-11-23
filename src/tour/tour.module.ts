import { Module, forwardRef } from '@nestjs/common'
import { TourController } from './tour.controller'
import { TourService } from './tour.service'
import { TourRepositoryModule } from './persistence/tour.repository.module'
import { BookModule } from 'src/book/book.module'

@Module({
  imports: [TourRepositoryModule, forwardRef(() => BookModule)],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
