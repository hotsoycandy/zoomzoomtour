import { IsEnum, IsNumber, Max, Min, ValidateIf } from 'class-validator'
import { DayoffType } from '../entity/dayoff.entity'

export class CreateDayoffDto {
  @IsEnum(DayoffType)
  public type!: DayoffType

  @ValidateIf((obj) => obj.type === DayoffType.DATE)
  @IsNumber()
  @Min(1)
  @Max(12)
  public month?: number

  @ValidateIf((obj) => obj.type === DayoffType.DATE)
  @IsNumber()
  @Min(1)
  @Max(31)
  public date?: number

  @ValidateIf((obj) => obj.type === DayoffType.DAY)
  @IsNumber()
  @Min(0)
  @Max(6)
  public day?: number
}
