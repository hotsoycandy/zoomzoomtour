import { Dayoff, DayoffType } from './entity/dayoff.entity'
import { Tour } from 'src/tour/entity/tour.entity'

export abstract class DayoffRepository {
  abstract newDayoff(newDayoffParams: {
    type: DayoffType
    tour: Tour
    month?: number
    date?: number
    day?: number
  }): Dayoff

  abstract createDayoff(dayoff: Dayoff): Promise<Dayoff>

  abstract getDayoff(
    dayoffIdx: number,
    optionParams?: { relations?: string[] },
  ): Promise<Dayoff | null>

  abstract deleteDayoff(dayoffIdx: number): Promise<void>
}
