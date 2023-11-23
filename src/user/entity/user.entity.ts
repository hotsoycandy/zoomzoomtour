import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Tour } from 'src/tour/entity/tour.entity'
import { createSalt, createHash } from 'src/common/util/encrypt'
import { Book } from 'src/book/entity/book.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column({ unique: true })
  public email!: string

  @Column()
  public password!: string

  @Column()
  public salt: string = createSalt()

  // relations
  @OneToMany(() => Book, (book) => book.buyer)
  public books?: Book[]

  @OneToMany(() => Tour, (tour) => tour.seller)
  public tours?: Tour[]

  // methods
  async hashPassword(): Promise<this> {
    this.password = await createHash(this.password, this.salt)
    return this
  }

  async checkPassword(password: string): Promise<boolean> {
    return this.password === (await createHash(password, this.salt))
  }
}
