import { IsString, MaxLength } from 'class-validator'

export class CreateTourDto {
  @IsString()
  @MaxLength(100)
  public title!: string

  @IsString()
  @MaxLength(1000)
  public description!: string
}
