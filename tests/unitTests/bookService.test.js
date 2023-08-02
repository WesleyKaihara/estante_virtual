const { describe, it } = require("mocha")
const { expect } = require("chai")

const BookRepository = require("../../src/repository/bookRepository")
const BookService = require("../../src/services/bookService")

const mocks = {
  VALID_COMPLETE_READING: require("../mocks/book/valid-complete-reading.json"),
  INVALID_COMPLETE_READING: require("../mocks/book/invalid-complete-reading.json"),
  VALID_IN_PROGRESS_READING: require("../mocks/book/valid-in-progess-reading.json"),
  INVALID_IN_PROGRESS_READING: require("../mocks/book/invalid-in-progess-reading.json"),
  VALID_INTEREST_READING: require("../mocks/book/valid-interest-reading.json"),
  INVALID_INTEREST_READING: require("../mocks/book/invalid-in-progess-reading.json"),
}

describe("#BooksService Suite Test",() => {
  it("should receive the start and end date of the reading if the reading status for 'Complete Reading'", () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.VALID_COMPLETE_READING).validateBody()

    expect(createBookService).to.be.ok
  })

  it("should throw an exception if dont't receive the start date of reading or don't receive the end date for the status 'Complete Reading'" , () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.INVALID_COMPLETE_READING).validateBody()

    expect(createBookService).to.throw(`The field "endDateReading" is required for registers with reading status "COMPLETED"`)
  })

  it("should receive the start date of reading and should not receive the end date for the status 'Reading in progress'" , () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.VALID_IN_PROGRESS_READING).validateBody()

    expect(createBookService).to.ok;
  })

  it("should receive the start date of reading and should not receive the end date for the status 'Reading in progress'" , () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.VALID_IN_PROGRESS_READING).validateBody()

    expect(createBookService).to.ok;
  })

  it("should throw an exception if receive the start date of reading and receive the end date for the status 'Reading in progress'" , () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.INVALID_IN_PROGRESS_READING).validateBody()

    expect(createBookService).to.throw(`The field "endDateReading" should't be present for records with read status "IN_PROGRESS"`)
  })

  it("should't receive the start date and end date for the status 'Reading interest'" ,() => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.VALID_INTEREST_READING).validateBody()

    expect(createBookService).to.ok;
  })

  it("should throw an exception if receive the start date of reading or receive the end date for the status 'Reading interest'" , () => {
    const bookRepository = new BookRepository([])
    const createBookService = () => new BookService(bookRepository, mocks.INVALID_INTEREST_READING).validateBody()

    expect(createBookService).to.throw(`The field "endDateReading" should't be present for records with read status "IN_PROGRESS"`)
  })

})