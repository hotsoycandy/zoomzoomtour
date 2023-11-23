import { Tour } from './entity/tour.entity'
import { User } from 'src/user/entity/user.entity'

export abstract class TourRepository {
  abstract newTour(createTourParams: {
    title: string
    description: string
    seller: User
  }): Tour

  abstract createTour(tour: Tour): Promise<Tour>
}
