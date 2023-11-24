import {
  IsDate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { getDateOnly } from 'src/common/util/get-date-only'

@ValidatorConstraint()
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    return (
      date instanceof Date && getDateOnly(new Date()).getTime() < date.getTime()
    )
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} can not before now.`
  }
}

function IsAfterNow(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAfterNowConstraint,
    })
  }
}

export class CreateBookDto {
  @IsDate()
  @Transform(({ value }: { value: string }) => {
    return getDateOnly(new Date(value))
  })
  @IsAfterNow()
  public schedule!: Date
}
