const uuid = require("uuid")
const READING_STATUS = require("../constants/reading-status");

class BookService {
  constructor(
    bookRepository,
    { id, user, title, status, startDateReading, endDateReading }
  ) {
    this.bookRepository = bookRepository;
    this.book = {
      id,
      user,
      title,
      status,
      startDateReading,
      endDateReading,
    }
  }

  getStatusRef() {
    return READING_STATUS[this.book.status];
  }

  validateBody() {
    const { title, fields } = this.getStatusRef();

    fields.forEach((field) => {
      if (!this.book[field]) {
        throw new Error(
          `The field "${field}" is required for registers with reading status "${title}"`
        );
      }
      
      for (const BookField in this.book) {
        if(!fields.includes(BookField) && this.book[BookField]) {
          throw new Error(
            `The field "${BookField}" should't be present for records with read status "${title}"`
          );
        }
      }

    });
  }

  async save() {
    this.book.id = uuid.v4()
    this.validateBody()
    const newBookRegister = await this.bookRepository.save(this.book);
    return newBookRegister
  }

  async update() {
    this.validateBody()
    const book = await this.bookRepository.find(this.book.id, "id")

    if(!book?.id) {
      throw new Error(`Book with id "${this.book.id}" Not Found!!`)
    }

    const { id, user, ...bookData} = this.book
    const updatedBook = await this.bookRepository.update(this.book.id, {
      user: book.user,
      ...bookData
    })
    
    return updatedBook
  }

  async delete() {
    const bookExists = await this.bookRepository.find(this.book.id, "id")

    if(!bookExists.id) {
      throw new Error(`Book with id "${this.book.id}" Not Found!!`)
    }

    this.bookRepository.delete(this.book.id)
    return
  }
}

module.exports = BookService;
