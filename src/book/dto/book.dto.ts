import { pick } from 'lodash'
import { Book } from '../entity/book.entity'

export class BookDto {
  public idx!: number
  public schedule!: Date
  public confirmed!: boolean
  public token!: string | null
  public tourIdx!: number

  static from(book: Book): BookDto {
    const bookDto = new BookDto()
    Object.assign(
      bookDto,
      pick(book, ['idx', 'schedule', 'confirmed', 'token', 'tourIdx']),
    )
    return bookDto
  }
}
