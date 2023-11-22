import { IsEmail, IsString, IsStrongPassword, MaxLength } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsEmail()
  public email!: string

  @IsString()
  @MaxLength(30)
  @IsStrongPassword()
  public password!: string
}
