import { Module, forwardRef } from '@nestjs/common'
import { BookService } from './book.service'
import { BookRepositoryModule } from './persistence/book.repository.module'
import { TourModule } from 'src/tour/tour.module'
import { DayoffModule } from 'src/dayoff/dayoff.module'

@Module({
  imports: [
    BookRepositoryModule,
    forwardRef(() => TourModule),
    forwardRef(() => DayoffModule),
  ],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
