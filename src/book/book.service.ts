import { pick } from 'lodash'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
// services
import { TourService } from 'src/tour/tour.service'
import { DayoffService } from 'src/dayoff/dayoff.service'
// repos
import { BookRepository } from './book.repository'
// entities
import { Book } from './entity/book.entity'
import { User } from 'src/user/entity/user.entity'
// libs
import { getRandomInt } from 'src/common/util/get-random-int'

@Injectable()
export class BookService {
  constructor(
    private readonly tourService: TourService,
    private readonly dayoffService: DayoffService,
    private readonly bookRepository: BookRepository,
  ) {}

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

  async createBook(createBookParams: {
    buyer: User
    tourIdx: number
    schedule: Date
  }): Promise<Book> {
    const { tourIdx, schedule } = createBookParams

    const tour = await this.tourService.getTour(tourIdx)

    const dayoffs = await this.dayoffService.getDayoffs({ tourIdx })
    dayoffs.forEach((dayoff) => {
      if (!dayoff.checkDayoff(schedule)) {
        throw new BadRequestException("it's day off")
      }
    })

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

  async getBook(bookIdx: number): Promise<Book> {
    const book = await this.bookRepository.getBook({ idx: bookIdx })
    if (book === null) {
      throw new NotFoundException('book is not found')
    }
    return book
  }

  async deleteBook(deleteBookParams: {
    buyer: User
    bookIdx: number
  }): Promise<void> {
    const {
      bookIdx,
      buyer: { idx: buyerIdx },
    } = deleteBookParams

    const book = await this.getBook(bookIdx)
    if (book.buyerIdx !== buyerIdx) {
      throw new UnauthorizedException()
    }
    if (book.checkCancel()) {
      throw new BadRequestException("it's too late to cancel")
    }

    await this.bookRepository.deleteBook(bookIdx)
  }

  async getBooks(getBooksParams: { buyerIdx?: number }): Promise<Book[]> {
    return await this.bookRepository.getBooks(
      pick(getBooksParams, ['buyerIdx']),
    )
  }

  async getTourBooks(getBooksParams: {
    sellerIdx: number
    tourIdx: number
  }): Promise<Book[]> {
    const { tourIdx, sellerIdx } = getBooksParams
    const tour = await this.tourService.getTour(tourIdx)
    if (tour.sellerIdx !== sellerIdx) {
      throw new UnauthorizedException()
    }
    return await this.bookRepository.getBooks(pick(getBooksParams, ['tourIdx']))
  }

  async confirmBook(confirmBookParams: {
    tourIdx: number
    sellerIdx: number
    bookIdx: number
  }): Promise<Book> {
    const { tourIdx, sellerIdx, bookIdx } = confirmBookParams

    const tour = await this.tourService.getTour(tourIdx)
    if (tour.sellerIdx !== sellerIdx) {
      throw new UnauthorizedException()
    }

    const book = await this.getBook(bookIdx)
    if (book.confirmed) {
      throw new BadRequestException('book is already confirmed')
    }

    book.confirmed = true
    book.token = await this.generateToken()
    return await this.bookRepository.save(book)
  }

  async getBookByToken(getBookByTokenParams: {
    sellerIdx: number
    token: string
  }): Promise<Book> {
    const { token, sellerIdx } = getBookByTokenParams
    const book = await this.bookRepository.getBook(
      { token },
      { relations: ['tour'] },
    )
    if (book === null) {
      throw new NotFoundException('token is not found')
    }
    if (book?.tour?.seller.idx !== sellerIdx) {
      throw new UnauthorizedException()
    }
    return book
  }
}
