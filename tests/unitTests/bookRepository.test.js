const { describe, it } = require("mocha")
const { expect } = require("chai")
const BookRepository = require('../../src/repository/bookRepository')

const mocks = {
  USERS_BOOKS_LIST: require("../mocks/book/book-list.json")
}

describe("#BookRepository Suite Test" , () => {
  it("should be return a filtered books by User correctly", async() => {
    const bookRepository = new BookRepository(mocks.USERS_BOOKS_LIST)

    const expected = [
      {
        id: 1,
        user: 1,
        title: 'Clean Code',
        startDateReading: '2022-01-01',
        endDateReading: '2022-05-20',
        status: 1
      },
      {
        id: 3,
        user: 1,
        title: "Let's learn Go!",
        startDateReading: '2023-05-02',
        endDateReading: '',
        status: 2
      }
    ]

    const result = await bookRepository.filter(1,"user")

    expect(result).to.deep.equal(expected)
  })

  it("should be return a book registered by the user correctly", async() => {
    const bookRepository = new BookRepository(mocks.USERS_BOOKS_LIST)

    const expected = {
      id: 2,
      user: 2,
      title: 'Refactoring',
      startDateReading: '2014-10-18',
      endDateReading: '2015-02-08',
      status: 1
    }

    const result = await bookRepository.find(2,"id")

    expect(result).to.deep.equal(expected)
  })
})