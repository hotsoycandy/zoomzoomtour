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

  newTour(createTourParams: {
    title: string
    description: string
    seller: User
  }): Tour {
    return this.tourRepository.create(
      pick(createTourParams, ['title', 'description', 'seller']),
    )
  }

  async createTour(tour: Tour): Promise<Tour> {
    return await this.tourRepository.save(tour)
  }

  async getTour(tourIdx: number): Promise<Tour | null> {
    return await this.tourRepository.findOne({ where: { idx: tourIdx } })
  }

  async getTours(): Promise<Tour[]> {
    return await this.tourRepository.find()
  }
}
