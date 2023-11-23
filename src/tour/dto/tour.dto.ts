import { pick } from 'lodash'
import { Tour } from '../entity/tour.entity'

export class TourDto {
  public title!: string
  public sellerIdx!: string
  public sellerEmail!: string

  static from(tour: Tour): TourDto {
    const tourDto = new TourDto()
    Object.assign(tourDto, pick(tour, ['title', 'description']), {
      sellerIdx: tour.seller?.idx,
      sellerEmail: tour.seller?.email,
    })
    return tourDto
  }
}
