import { isNil } from 'lodash'
import { createClient } from 'redis'
import { Repository } from 'redis-om'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { tourAvailableSchema } from './schema/tour-available.schema'

@Injectable()
export class RedisService {
  private readonly redisClient: ReturnType<typeof createClient>
  private readonly tourAvailableRepository: Repository
  private readonly logger = new Logger(RedisService.name)

  constructor(private readonly configService: ConfigService) {
    // connect redis
    const redisClient = createClient({
      password: configService.get('REDIS_PASSWORD'),
      socket: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    })
    this.redisClient = redisClient

    // event logging
    const errLogger = (err: any) => this.logger.error('Redis Client Error', err)
    redisClient.on('error', errLogger)
    redisClient.on('connect', () => {
      this.logger.log('Redis client is connected')
    })

    // connect
    redisClient.connect().catch(errLogger)

    // set repositroeis
    this.tourAvailableRepository = new Repository(
      tourAvailableSchema,
      redisClient,
    )
  }

  private getTourAvailableKey(targetParams: {
    tourIdx: number
    year: number
    month: number
  }): string {
    const { tourIdx, year, month } = targetParams
    return `${tourIdx}-${year}-${month}`
  }

  async setTourAvailable(
    targetParams: {
      tourIdx: number
      year: number
      month: number
    },
    dates: number[],
  ): Promise<void> {
    await this.tourAvailableRepository.save(
      this.getTourAvailableKey(targetParams),
      { dates },
    )
  }

  async getTourAvailable(targetParams: {
    tourIdx: number
    year: number
    month: number
  }): Promise<number[] | null> {
    const { dates } = await this.tourAvailableRepository.fetch(
      this.getTourAvailableKey(targetParams),
    )
    return !isNil(dates) ? (dates as number[]) : null
  }

  async deleteTourAvailable(targetParams: {
    tourIdx: number
    year: number
    month: number
  }): Promise<void> {
    await this.tourAvailableRepository.remove(
      this.getTourAvailableKey(targetParams),
    )
  }
}
