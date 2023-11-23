import { pick } from 'lodash'
import { Injectable, NotFoundException } from '@nestjs/common'
import { TourService } from 'src/tour/tour.service'
import { DayoffRepository } from './dayoff.repository'
import { Dayoff, DayoffType } from './entity/dayoff.entity'

@Injectable()
export class DayoffService {
  constructor(
    private readonly dayoffRepository: DayoffRepository,
    private readonly tourService: TourService,
  ) {}

  async createDayoff(createDayoffParams: {
    tourIdx: number
    type: DayoffType
    month?: number
    date?: number
    day?: number
  }): Promise<Dayoff> {
    const tour = await this.tourService.getTour(createDayoffParams.tourIdx)
    if (tour === null) {
      throw new NotFoundException('123')
    }
    const dayoff = this.dayoffRepository.newDayoff({
      ...pick(createDayoffParams, ['type', 'month', 'date', 'day']),
      tour,
    })
    return await this.dayoffRepository.createDayoff(dayoff)
  }
}
