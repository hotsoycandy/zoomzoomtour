import { pick } from 'lodash'
import { Injectable } from '@nestjs/common'
import { TourRepository } from './tour.repository'
import { Tour } from './entity/tour.entity'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}

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
}
