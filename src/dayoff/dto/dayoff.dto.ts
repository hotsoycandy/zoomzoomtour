import { pick } from 'lodash'
import { Dayoff, DayoffType } from '../entity/dayoff.entity'

export class DayoffDto {
  public idx!: number
  public type!: DayoffType
  public month?: number
  public date?: number
  public day?: number

  static from(dayoff: Dayoff): DayoffDto {
    const dayoffDto = new DayoffDto()
    switch (dayoff.type) {
      case DayoffType.DATE:
        Object.assign(dayoffDto, pick(dayoff, ['idx', 'type', 'month', 'date']))
        break
      case DayoffType.DAY:
        Object.assign(dayoffDto, pick(dayoff, ['idx', 'type', 'day']))
        break
    }

    return dayoffDto
  }
}
