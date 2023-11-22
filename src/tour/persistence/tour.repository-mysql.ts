import { pick } from 'lodash'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TourRepository } from '../tour.repository'
import { Tour } from '../entity/tour.entity'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class TourRepositoryMysql implements TourRepository {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  newTour(createTourParams: { title: string; seller: User }): Tour {
    return this.tourRepository.create(
      pick(createTourParams, ['title', 'seller']),
    )
  }

  async createTour(tour: Tour): Promise<Tour> {
    return await this.tourRepository.save(tour)
  }
}
