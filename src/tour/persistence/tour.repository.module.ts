import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tour } from '../entity/tour.entity'
import { TourRepository } from '../tour.repository'
import { TourRepositoryMysql } from './tour.repository-mysql'

const tourRepositoryMysqlProviders: Provider[] = [
  TourRepositoryMysql,
  {
    provide: TourRepository,
    useExisting: TourRepositoryMysql,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  providers: [...tourRepositoryMysqlProviders],
  exports: [...tourRepositoryMysqlProviders],
})
export class TourRepositoryModule {}
