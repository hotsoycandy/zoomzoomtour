import { Module, forwardRef } from '@nestjs/common'
import { TourModule } from 'src/tour/tour.module'
import { BookRepositoryModule } from './persistence/book.repository.module'
import { BookService } from './book.service'

@Module({
  imports: [BookRepositoryModule, forwardRef(() => TourModule)],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
