import { pick } from 'lodash'
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common'
import { TourRepository } from './tour.repository'
import { Tour } from './entity/tour.entity'
import { User } from 'src/user/entity/user.entity'
import { RedisService } from 'src/infrastructure/redis/redis.service'
import { DayoffService } from 'src/dayoff/dayoff.service'
import { Dayoff } from 'src/dayoff/entity/dayoff.entity'

@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => DayoffService))
    private readonly dayoffService: DayoffService,
  ) {}

  async createTour(createTourParams: {
    title: string
    description: string
    seller: User
  }): Promise<Tour> {
    const tour = this.tourRepository.newTour(
      pick(createTourParams, ['title', 'description', 'seller']),
    )
    return await this.tourRepository.createTour(tour)
  }

  async getTourAvailable(getTourAvailableParams: {
    tourIdx: number
    year: number
    month: number
  }): Promise<number[]> {
    const { tourIdx, year, month } = getTourAvailableParams

    // get cached tour dates
    const dates = await this.redisService.getTourAvailable({
      tourIdx,
      year,
      month,
    })
    if (dates !== null) return dates

    // calculate tour dates
    const dayoffs = await this.dayoffService.getDayoffs({ tourIdx })
    const tourAvailable = Dayoff.getTourAvailable(year, month, dayoffs)

    // set cache tour dates
    await this.redisService.setTourAvailable(
      { tourIdx, year, month },
      tourAvailable,
    )
    return tourAvailable
  }

  async getTour(tourIdx: number): Promise<Tour> {
    const tour = await this.tourRepository.getTour(tourIdx)
    if (tour === null) {
      throw new NotFoundException('tour is not found')
    }
    return tour
  }

  async getTours(): Promise<Tour[]> {
    return await this.tourRepository.getTours()
  }
}
