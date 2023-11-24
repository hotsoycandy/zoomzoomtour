import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dayoff } from '../entity/dayoff.entity'
import { DayoffRepository } from '../dayoff.repository'
import { DayoffRepositoryMysql } from './dayoff.repository-mysql'

const dayoffRepositoryMysqlProviders: Provider[] = [
  DayoffRepositoryMysql,
  {
    provide: DayoffRepository,
    useExisting: DayoffRepositoryMysql,
  },
]

@Module({
  imports: [TypeOrmModule.forFeature([Dayoff])],
  providers: [...dayoffRepositoryMysqlProviders],
  exports: [...dayoffRepositoryMysqlProviders],
})
export class DayoffRepositoryModule {}
