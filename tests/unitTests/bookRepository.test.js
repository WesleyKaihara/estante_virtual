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
        id: "c8300d2e-846d-48e7-92a9-0544f4eb14cf",
        user: 1,
        title: 'Clean Code',
        startDateReading: '2022-01-01',
        endDateReading: '2022-05-20',
        status: 1
      },
      {
        id: "94fc8882-52e4-4b81-bee5-be26c3cc1454",
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
      id: "2cc5245f-6452-4b8c-bef3-86ea663a17c8",
      user: 2,
      title: 'Refactoring',
      startDateReading: '2014-10-18',
      endDateReading: '2015-02-08',
      status: 1
    }

    const result = await bookRepository
      .find("2cc5245f-6452-4b8c-bef3-86ea663a17c8","id")

    expect(result).to.deep.equal(expected)
  })

  it("should be return book list", async () => {
    const bookRepository = new BookRepository(mocks.USERS_BOOKS_LIST);

    const expected = [
  {
    "id": "c8300d2e-846d-48e7-92a9-0544f4eb14cf",
    "user": 1,
    "title": "Clean Code",
    "startDateReading": "2022-01-01",
    "endDateReading": "2022-05-20",
    "status": 1
  },
  {
    "id": "2cc5245f-6452-4b8c-bef3-86ea663a17c8",
    "user": 2,
    "title": "Refactoring",
    "startDateReading": "2014-10-18",
    "endDateReading": "2015-02-08",
    "status": 1
  },
  {
    "id": "94fc8882-52e4-4b81-bee5-be26c3cc1454",
    "user": 1,
    "title": "Let's learn Go!",
    "startDateReading": "2023-05-02",
    "endDateReading": "",
    "status": 2
  },
  {
    "id": "e009efcc-232e-4318-a5e6-5bd8735b259e",
    "user": 4,
    "title": "Clean Code",
    "startDateReading": "",
    "endDateReading": "",
    "status": 3
  },
  {
    "id": "7b59fd59-d860-4583-8866-c2135ba8ee3e",
    "user": 3,
    "title": "Clean Code",
    "startDateReading": "2019-04-28",
    "endDateReading": "2019-09-14",
    "status": 1
  },
  {
    "id": "35b9b1ba-6048-4025-bf8e-36242d2cbb02",
    "user": 2,
    "title": "Open Data Structures",
    "startDateReading": "2017-05-18",
    "endDateReading": "2018-07-09",
    "status": 1
  }
];

    const result = await bookRepository.findMany("47882db8-90a4-404e-ae98-fd0989597b52", "id");
    
    expect(result).to.deep.equal(expected);
  });

  it("should be update book", async () => {
    const bookRepository = new BookRepository(mocks.USERS_BOOKS_LIST);

    const expected = {
      id: 'c8300d2e-846d-48e7-92a9-0544f4eb14cf',
      user: '35b9b1ba-6048-4025-bf8e-36242d2cbb02',
      title: 'Clean Code UPDATED',
      startDateReading: '2022-01-01',
      endDateReading: '2022-05-20',
      status: 1
    };

    const result = await bookRepository
      .update("c8300d2e-846d-48e7-92a9-0544f4eb14cf", expected);
    
      console.log(result);
    expect(result).to.deep.equal(expected);
  });

  it("should be delete book", async () => {
    const bookRepository = new BookRepository(mocks.USERS_BOOKS_LIST);

    const expected = "";
    const result = await bookRepository
      .delete("c8300d2e-846d-48e7-92a9-0544f4eb14cf");
    
    expect(result).to.deep.equal();
  });

  it("should't be throw exeption when search book in empty list", async () => {
    const bookRepository = new BookRepository([]);

    const expected = "";
    const result = await bookRepository
      .find("c8300d2e-846d-48e7-92a9-0544f4123eb14cf");
    
    expect(result).to.deep.equal({});
  });

  it("should't be throw exeption when delete book in empty list", async () => {
    const bookRepository = new BookRepository([]);

    const expected = "";
    const result = await bookRepository
      .delete("c83123d2e-846d-48e7-92a9-0544f4123eb14cf");
    
    expect(result).to.deep.equal();
  });
})