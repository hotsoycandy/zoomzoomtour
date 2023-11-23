import { PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Tour } from 'src/tour/entity/tour.entity'
import { User } from 'src/user/entity/user.entity'

export class Book {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column()
  public schedule!: Date

  @Column()
  public confirmed!: boolean

  @Column({ default: null })
  public token!: string | null

  // relations
  @ManyToOne(() => User, (user) => user.books)
  public buyer?: User

  @ManyToOne(() => Tour, (tour) => tour.books)
  public tour?: Tour
}
