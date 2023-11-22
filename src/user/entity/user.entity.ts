import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { createSalt, createHash } from 'src/common/util/encrypt'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public idx!: string

  @Column()
  public email!: string

  @Column()
  public password!: string

  @Column()
  public salt: string = createSalt()

  async hashPassword(): Promise<this> {
    this.password = await createHash(this.password, this.salt)
    return this
  }
}
