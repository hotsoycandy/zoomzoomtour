import { pick } from 'lodash'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { TourService } from 'src/tour/tour.service'
import { DayoffRepository } from './dayoff.repository'
import { Dayoff, DayoffType } from './entity/dayoff.entity'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class DayoffService {
  constructor(
    private readonly dayoffRepository: DayoffRepository,
    private readonly tourService: TourService,
  ) {}

  async createDayoff(createDayoffParams: {
    tourIdx: number
    seller: User
    type: DayoffType
    month?: number
    date?: number
    day?: number
  }): Promise<Dayoff> {
    const { seller } = createDayoffParams

    const tour = await this.tourService.getTour(createDayoffParams.tourIdx)
    if (tour === null) {
      throw new NotFoundException('tour is not found')
    }
    if (tour.seller.idx !== seller.idx) {
      throw new UnauthorizedException()
    }

    const dayoff = this.dayoffRepository.newDayoff({
      ...pick(createDayoffParams, ['type', 'month', 'date', 'day']),
      tour,
    })
    return await this.dayoffRepository.createDayoff(dayoff)
  }
}
