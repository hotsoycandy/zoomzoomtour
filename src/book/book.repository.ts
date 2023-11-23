import { Tour } from 'src/tour/entity/tour.entity'
import { User } from 'src/user/entity/user.entity'
import { Book } from './entity/book.entity'

export abstract class BookRepository {
  abstract newBook(createBookParams: {
    buyer: User
    tour: Tour
    schedule: Date
    confirmed: boolean
    token: string | null
  }): Book

  abstract createBook(book: Book): Promise<Book>

  abstract getBook(getBookParams: { token?: string }): Promise<Book | null>

  abstract getBooks(getBooksParams: {
    schedule?: Date
    tourIdx?: number
    confirmed?: boolean
  }): Promise<Book[]>
}