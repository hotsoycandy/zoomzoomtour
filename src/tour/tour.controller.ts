import { pick } from 'lodash'
import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common'
import { TourService } from './tour.service'
import { JwtAuthGuard } from 'src/infrastructure/server/auth/jwt-auth.guard'
import { RequestWithUser } from 'src/infrastructure/server/auth/auth'
import { TourDto } from './dto/tour.dto'
import { CreateTourDto } from './dto/create-tour.dto'

@Controller('tours')
export class TourController {
  constructor(private readonly tourSerivce: TourService) {}

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

  @Get()
  async getTours(): Promise<TourDto[]> {
    const tours = await this.tourSerivce.getTours()
    return tours.map((tour) => TourDto.from(tour))
  }
}
