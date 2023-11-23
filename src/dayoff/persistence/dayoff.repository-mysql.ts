import { pick } from 'lodash'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DayoffRepository } from '../dayoff.repository'
import { Dayoff, DayoffType } from '../entity/dayoff.entity'

@Injectable()
export class DayoffRepositoryMysql implements DayoffRepository {
  constructor(
    @InjectRepository(Dayoff)
    private readonly dayoffRepository: Repository<Dayoff>,
  ) {}

  newDayoff(newDayoffParams: { type: DayoffType; date: Date }): Dayoff {
    return this.dayoffRepository.create(pick(newDayoffParams, ['type', 'date']))
  }

  async createDayoff(dayoff: Dayoff): Promise<Dayoff> {
    return await this.dayoffRepository.save(dayoff)
  }
}
