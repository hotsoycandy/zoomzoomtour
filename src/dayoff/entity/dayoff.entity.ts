import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Tour } from 'src/tour/entity/tour.entity'

export enum DayoffType {
  DAY = 'DAY',
  DATE = 'DATE',
}

@Entity({ name: 'dayoffs' })
export class Dayoff {
  @PrimaryGeneratedColumn()
  public idx!: number

  @Column({ type: 'enum', enum: DayoffType })
  public type!: DayoffType

  @Column({ type: Number, nullable: true })
  public month?: number | null

  @Column({ type: Number, nullable: true })
  public date?: number | null

  @Column({ type: Number, nullable: true })
  public day?: number | null

  @Column()
  public tourIdx!: number

  @ManyToOne(() => Tour, (tour) => tour.dayoffs)
  @JoinColumn({ name: 'tourIdx', referencedColumnName: 'idx' })
  public tour?: Tour
}
