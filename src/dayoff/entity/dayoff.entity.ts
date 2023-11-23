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

  @Column()
  public date!: Date

  @Column()
  public tourIdx!: number

  @ManyToOne(() => Tour, (tour) => tour.dayoffs)
  @JoinColumn({ name: 'tourIdx', referencedColumnName: 'idx' })
  public Tour?: Tour
}
