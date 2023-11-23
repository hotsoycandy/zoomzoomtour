import { Dayoff, DayoffType } from './entity/dayoff.entity'

export abstract class DayoffRepository {
  abstract newDayoff(newDayoffParams: { type: DayoffType; date: Date }): Dayoff

  abstract createDayoff(dayoff: Dayoff): Promise<Dayoff>
}
