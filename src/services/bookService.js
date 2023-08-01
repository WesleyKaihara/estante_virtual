const READING_STATUS = require("../constants/reading-status");

class BookService {
  constructor(
    bookRepository,
    { user, title, status, startDateReading, endDateReading }
  ) {
    this.bookRepository = bookRepository;
    this.book = {
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
}

module.exports = BookService;
