import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/user/entity/user.entity'

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  public idx!: string

  @Column({ length: 100 })
  public title!: string

  @Column({ length: 1000 })
  public description!: string

  @ManyToOne(() => User, (user) => user.tours, { eager: true })
  public seller?: User
}
