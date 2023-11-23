import { pick } from 'lodash'
import { Injectable, NotFoundException } from '@nestjs/common'
import { TourService } from 'src/tour/tour.service'
import { BookRepository } from './book.repository'
import { Book } from './entity/book.entity'
import { User } from 'src/user/entity/user.entity'
import { getRandomInt } from 'src/common/util/get-random-int'

@Injectable()
export class BookService {
  constructor(
    private readonly tourService: TourService,
    private readonly bookRepository: BookRepository,
  ) {}

  async createBook(createBookParams: {
    buyer: User
    tourIdx: number
    schedule: Date
  }): Promise<Book> {
    const tour = await this.tourService.getTour(createBookParams.tourIdx)

    const books = await this.bookRepository.getBooks({
      ...pick(createBookParams, ['tourIdx', 'schedule']),
      confirmed: true,
    })
    const autoConfirmed = books.length < 5

    const book = this.bookRepository.newBook({
      ...pick(createBookParams, ['buyer', 'schedule']),
      tour,
      confirmed: autoConfirmed,
      token: autoConfirmed ? await this.generateToken() : null,
    })
    return await this.bookRepository.createBook(book)
  }

  private async generateToken(): Promise<string> {
    while (true) {
      const token = getRandomInt(
        Math.pow(10, 9),
        Math.pow(10, 10) - 1,
      ).toString()

      const book = await this.bookRepository.getBook({ token })
      if (book === null) return token
    }
  }

  async deleteBook(deleteBookParams: {
    buyer: User
    bookIdx: number
  }): Promise<void> {
    const {
      bookIdx,
      buyer: { idx: buyerIdx },
    } = deleteBookParams

    const book = await this.bookRepository.getBook({ idx: bookIdx })

    if (book === null || book.buyerIdx !== buyerIdx) {
      throw new NotFoundException('book is not found')
    }

    await this.bookRepository.deleteBook(bookIdx)
  }

  async getBooks(getBooksParams: { buyerIdx?: number }): Promise<Book[]> {
    return await this.bookRepository.getBooks(
      pick(getBooksParams, ['buyerIdx']),
    )
  }
}
