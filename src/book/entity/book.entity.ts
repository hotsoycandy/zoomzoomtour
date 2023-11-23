import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm'
import { Tour } from 'src/tour/entity/tour.entity'
import { User } from 'src/user/entity/user.entity'

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column()
  public schedule!: Date

  @Column()
  public confirmed!: boolean

  @Column({ type: String, default: null, nullable: true })
  public token!: string | null

  @Column()
  public tourIdx!: number

  // relations
  @ManyToOne(() => User, (user) => user.books)
  public buyer?: User

  @ManyToOne(() => Tour, (tour) => tour.books)
  @JoinColumn({ name: 'tourIdx', referencedColumnName: 'idx' })
  public tour?: Tour
}
