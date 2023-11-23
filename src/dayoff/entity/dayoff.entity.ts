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

  checkDayoff(checkDate: Date): boolean {
    switch (this.type) {
      case DayoffType.DATE:
        if (
          checkDate.getMonth() + 1 === this.month &&
          checkDate.getDate() === this.date
        ) {
          return false
        }
        break
      case DayoffType.DAY:
        if (checkDate.getDay() === this.day) {
          return false
        }
        break
    }

    return true
  }
}
