import { pick } from 'lodash'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// repository interface
import { BookRepository } from '../book.repository'
// entities
import { Book } from '../entity/book.entity'
import { User } from 'src/user/entity/user.entity'
import { Tour } from 'src/tour/entity/tour.entity'

@Injectable()
export class BookRepositoryMysql implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  newBook(createBookParams: {
    buyer: User
    tour: Tour
    schedule: Date
    confirmed: boolean
    token: string | null
  }): Book {
    return this.bookRepository.create(
      pick(createBookParams, [
        'buyer',
        'tour',
        'schedule',
        'confirmed',
        'token',
      ]),
    )
  }

  async createBook(book: Book): Promise<Book> {
    return await this.bookRepository.save(book)
  }

  async getBook(getBookParams: {
    idx?: number
    token?: string
  }): Promise<Book | null> {
    return await this.bookRepository.findOne({
      where: pick(getBookParams, ['idx', 'token']),
    })
  }

  async getBooks(getBooksParams: {
    schedule?: Date
    tourIdx?: number
    confirmed?: boolean
  }): Promise<Book[]> {
    return await this.bookRepository.find({
      where: pick(getBooksParams, ['schedule', 'tourIdx', 'confirmed']),
    })
  }
}
