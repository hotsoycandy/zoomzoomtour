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
    return `tourAvailableKey:${tourIdx}-${year}-${month}`
  }

  private getTourAvailableSetKey(tourIdx: number): string {
    return `tourAvailableSetKey:${tourIdx.toString()}`
  }

  async setTourAvailable(
    targetParams: {
      tourIdx: number
      year: number
      month: number
    },
    dates: number[],
  ): Promise<void> {
    const { tourIdx } = targetParams
    const tourAvailableKey = this.getTourAvailableKey(targetParams)
    const tourAvailableSetKey = this.getTourAvailableSetKey(tourIdx)
    // cache dates
    await this.tourAvailableRepository.save(tourAvailableKey, { dates })
    // cache keys
    await this.redisClient.sAdd(tourAvailableSetKey, tourAvailableKey)
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

  async deleteTourAvailable(tourIdx: number): Promise<void> {
    const tourAvailableSetKey = this.getTourAvailableSetKey(tourIdx)

    const tourAvailableKeys =
      await this.redisClient.sMembers(tourAvailableSetKey)

    for (const tourAvailableKey of tourAvailableKeys) {
      await this.tourAvailableRepository.remove(tourAvailableKey)
    }
    await this.redisClient.del(tourAvailableSetKey)
  }
}
