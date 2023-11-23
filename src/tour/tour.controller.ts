import { pick } from 'lodash'
import {
  Controller,
  Request,
  UseGuards,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { RequestWithUser } from 'src/infrastructure/server/auth/auth'
import { JwtAuthGuard } from 'src/infrastructure/server/auth/jwt-auth.guard'
// services
import { TourService } from './tour.service'
import { BookService } from 'src/book/book.service'
import { DayoffService } from 'src/dayoff/dayoff.service'
// dtos
import { TourDto } from './dto/tour.dto'
import { CreateTourDto } from './dto/create-tour.dto'
import { BookDto } from 'src/book/dto/book.dto'
import { CreateBookDto } from 'src/book/dto/create-book.dto'
import { CreateDayoffDto } from 'src/dayoff/dto/create-dayoff.dto'
import { DayoffDto } from 'src/dayoff/dto/dayoff.dto'

@Controller('tours')
export class TourController {
  constructor(
    private readonly tourSerivce: TourService,
    private readonly bookService: BookService,
    private readonly dayoffService: DayoffService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTour(
    @Request() req: RequestWithUser,
    @Body() createTourDto: CreateTourDto,
  ): Promise<TourDto> {
    const tour = await this.tourSerivce.createTour({
      ...pick(createTourDto, ['title', 'description']),
      seller: req.user,
    })
    return TourDto.from(tour)
  }

  @Get('')
  async getTours(): Promise<TourDto[]> {
    const tours = await this.tourSerivce.getTours()
    return tours.map((tour) => TourDto.from(tour))
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:tourIdx/books')
  async createBook(
    @Request() req: RequestWithUser,
    @Param('tourIdx') tourIdx: number,
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookDto> {
    const book = await this.bookService.createBook({
      buyer: req.user,
      tourIdx: tourIdx,
      schedule: createBookDto.schedule,
    })
    return BookDto.from(book)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/books/:bookIdx')
  async deleteBook(
    @Request() req: RequestWithUser,
    @Param('bookIdx') bookIdx: number,
  ): Promise<void> {
    await this.bookService.deleteBook({
      buyer: req.user,
      bookIdx,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/books/me')
  async getMyBooks(@Request() req: RequestWithUser): Promise<BookDto[]> {
    const books = await this.bookService.getBooks({ buyerIdx: req.user.idx })
    return books.map((book) => BookDto.from(book))
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:tourIdx/books')
  async getTourBooks(
    @Request() req: RequestWithUser,
    @Param('tourIdx') tourIdx: number,
  ): Promise<BookDto[]> {
    const books = await this.bookService.getTourBooks({
      tourIdx,
      sellerIdx: req.user.idx,
    })
    return books.map((book) => BookDto.from(book))
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:tourIdx/books/:bookIdx/confirm')
  async confirmBook(
    @Request() req: RequestWithUser,
    @Param('tourIdx') tourIdx: number,
    @Param('bookIdx') bookIdx: number,
  ): Promise<BookDto> {
    const book = await this.bookService.confirmBook({
      tourIdx,
      bookIdx,
      sellerIdx: req.user.idx,
    })
    return BookDto.from(book)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/books/token/:token')
  async getBookByToken(
    @Request() req: RequestWithUser,
    @Param('token') token: string,
  ): Promise<BookDto> {
    const book = await this.bookService.getBookByToken({
      sellerIdx: req.user.idx,
      token,
    })
    return BookDto.from(book)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:tourIdx/dayoff')
  async createDayoff(
    @Body() createDayoffDto: CreateDayoffDto,
    @Param('tourIdx') tourIdx: number,
  ): Promise<DayoffDto> {
    const dayoff = await this.dayoffService.createDayoff({
      ...pick(createDayoffDto, ['type', 'month', 'date', 'day']),
      tourIdx,
    })
    return DayoffDto.from(dayoff)
  }
}
