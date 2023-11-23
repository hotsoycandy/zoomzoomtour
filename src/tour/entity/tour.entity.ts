import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/user/entity/user.entity'
import { Book } from 'src/book/entity/book.entity'
import { Dayoff } from 'src/dayoff/entity/dayoff.entity'

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column({ length: 100 })
  public title!: string

  @Column({ length: 1000 })
  public description!: string

  @Column()
  public sellerIdx!: number

  // relations
  @ManyToOne(() => User, (user) => user.tours, { eager: true })
  @JoinColumn({ name: 'sellerIdx', referencedColumnName: 'idx' })
  public seller!: User

  @OneToMany(() => Book, (book) => book.tour)
  public books?: Book[]

  @OneToMany(() => Dayoff, (dayoff) => dayoff.Tour)
  public dayoffs?: Dayoff[]
}
