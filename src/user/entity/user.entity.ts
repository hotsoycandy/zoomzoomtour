import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public idx!: string

  @Column()
  public email!: string

  @Column()
  public password!: string
}
