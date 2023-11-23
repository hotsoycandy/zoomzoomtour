import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { User } from 'src/user/entity/user.entity'
import { Book } from 'src/book/entity/book.entity'

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column({ length: 100 })
  public title!: string

  @Column({ length: 1000 })
  public description!: string

  @ManyToOne(() => User, (user) => user.tours, { eager: true })
  public seller!: User

  @OneToMany(() => Book, (book) => book.tour)
  public books?: Book[]
}
