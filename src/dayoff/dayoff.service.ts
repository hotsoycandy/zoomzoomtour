import { pick } from 'lodash'
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common'
import { TourService } from 'src/tour/tour.service'
import { RedisService } from 'src/infrastructure/redis/redis.service'
import { DayoffRepository } from './dayoff.repository'
import { Dayoff, DayoffType } from './entity/dayoff.entity'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class DayoffService {
  constructor(
    private readonly dayoffRepository: DayoffRepository,
    @Inject(forwardRef(() => TourService))
    private readonly tourService: TourService,
    private readonly redisService: RedisService,
  ) {}

  async createDayoff(createDayoffParams: {
    tourIdx: number
    seller: User
    type: DayoffType
    month?: number
    date?: number
    day?: number
  }): Promise<Dayoff> {
    const { tourIdx, seller } = createDayoffParams

    const tour = await this.tourService.getTour(createDayoffParams.tourIdx)
    if (tour.seller.idx !== seller.idx) {
      throw new UnauthorizedException()
    }

    // delete cached dates
    await this.redisService.deleteTourAvailable(tourIdx)

    const dayoff = this.dayoffRepository.newDayoff({
      ...pick(createDayoffParams, ['type', 'month', 'date', 'day']),
      tour,
    })
    return await this.dayoffRepository.createDayoff(dayoff)
  }

  async getDayoff(dayoffIdx: number): Promise<Dayoff> {
    const dayoff = await this.dayoffRepository.getDayoff(dayoffIdx, {
      relations: ['tour'],
    })
    if (dayoff === null) {
      throw new NotFoundException('dayyoff is not found')
    }
    return dayoff
  }

  async getDayoffs(getDayoffsParams: { tourIdx?: number }): Promise<Dayoff[]> {
    return await this.dayoffRepository.getDayoffs(
      pick(getDayoffsParams, ['tourIdx']),
    )
  }

  async deleteDayoff(deleteDayoffParams: {
    dayoffIdx: number
    seller: User
  }): Promise<void> {
    const { dayoffIdx, seller } = deleteDayoffParams
    const dayoff = await this.getDayoff(dayoffIdx)
    if (dayoff.tour?.seller.idx !== seller.idx) {
      throw new UnauthorizedException()
    }
    await this.dayoffRepository.deleteDayoff(dayoffIdx)

    // delete cached dates
    await this.redisService.deleteTourAvailable(dayoff.tourIdx)
  }
}
