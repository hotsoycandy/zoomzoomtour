import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'redis-om'
import { createClient } from 'redis'
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

  private getTourAvailableKey(tourIdx: number, month: number): string {
    return `${tourIdx}-${month}`
  }

  async setTourAvailable(
    tourIdx: number,
    month: number,
    dates: number[],
  ): Promise<void> {
    await this.tourAvailableRepository.save(
      this.getTourAvailableKey(tourIdx, month),
      { dates },
    )
  }

  async getTourAvailable(tourIdx: number, month: number): Promise<number[]> {
    const { dates } = await this.tourAvailableRepository.fetch(
      this.getTourAvailableKey(tourIdx, month),
    )
    return dates as number[]
  }

  async deleteTourAvailable(tourIdx: number, month: number): Promise<void> {
    await this.tourAvailableRepository.remove(
      this.getTourAvailableKey(tourIdx, month),
    )
  }
}
