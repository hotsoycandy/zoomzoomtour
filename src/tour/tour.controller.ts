import { pick } from 'lodash'
import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common'
import { RequestWithUser } from 'src/infrastructure/server/auth/auth'
import { JwtAuthGuard } from 'src/infrastructure/server/auth/jwt-auth.guard'
// services
import { TourService } from './tour.service'
import { BookService } from 'src/book/book.service'
// dtos
import { TourDto } from './dto/tour.dto'
import { CreateTourDto } from './dto/create-tour.dto'
import { BookDto } from 'src/book/dto/book.dto'
import { CreateBookDto } from 'src/book/dto/create-book.dto'

@Controller('tours')
export class TourController {
  constructor(
    private readonly tourSerivce: TourService,
    private readonly bookService: BookService,
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
}
