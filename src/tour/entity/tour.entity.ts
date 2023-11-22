import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/user/entity/user.entity'

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  public idx!: string

  @Column()
  public title!: string

  @ManyToOne(() => User, (user) => user.tours)
  public seller?: User
}
