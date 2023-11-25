import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from '../entity/book.entity'
import { BookRepository } from '../book.repository'
import { BookRepositoryMysql } from './book.repository-mysql'

const bookRepositoryMysqlProviders: Provider[] = [
  BookRepositoryMysql,
  {
    provide: BookRepository,
    useExisting: BookRepositoryMysql,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [...bookRepositoryMysqlProviders],
  exports: [...bookRepositoryMysqlProviders],
})
export class BookRepositoryModule {}
