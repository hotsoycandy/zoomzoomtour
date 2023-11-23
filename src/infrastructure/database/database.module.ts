import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/user/entity/user.entity'
import { Tour } from 'src/tour/entity/tour.entity'
import { Book } from 'src/book/entity/book.entity'

function isDevEnv(NODE_ENV: string): boolean {
  return ['development', 'test'].includes(NODE_ENV)
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DATABASE_HOST'),
        port: parseInt(config.get('DATABASE_PORT') ?? '3306'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [User, Tour, Book],
        synchronize: isDevEnv(config.get('NODE_ENV') as string),
        logging: isDevEnv(config.get('NODE_ENV') as string),
      }),
    }),
  ],
})
export class DatabaseModule {}
