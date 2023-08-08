const { describe, it } = require("mocha");
const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const BookRepository = require('../../src/repository/bookRepository');

const supertest = require('supertest');

const server = require("../../src/server");

const mocks = {
  UPDATE_USER: require("../mocks/user/update-user-valid-body.json"),
  VALID_BOOK: require("../mocks/book/valid-update-body.json"),
  INVALID_BOOK_REGISTER: require("../mocks/book/invalid-book-register.json"),
}

describe("#Book Routes", () => {
  let app;

  before((done) => {
    app = server(3001);
    app.once("listening", done);
    

    sandbox.stub(BookRepository.prototype, 'findMany').value([
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
    ])
  });

  afterEach(function() {
    app.close();
    sandbox.restore();
  });

  it("should be return status 200 in base url", (done) => {
    supertest(app)
      .get("/books")
      .expect(200)
      .expect([],done());
  });

  it("should be return status 200 in base url with stub" , (done) => {
    supertest(app)
      .get("/books")
      .expect(200)
      .expect([], done)
  })

  it("should be return status 200 user body is Valid" , (done) => {
    const response = supertest(app)
      .post("/book")
      .send({
        "user": 2,
        "title": "Open Data Structures",
        "startDateReading": "2017-05-18",
        "endDateReading": "2018-07-09",
        "status": 1
      })
      .expect(200,done)
  })

  it("should be throw exeption when user body is Invalid" , (done) => {
    const response = supertest(app)
      .post("/book")
      .send({
        "user": 2,
        "title": "Open Data Structures",
        "startDateReading": "2017-05-18",
        "status": 1
      })
      .expect(400)
      .expect({
        "message": "The field \"endDateReading\" is required for registers with reading status \"COMPLETED\""
      }, done)
  })

  it("should be return status 200 when update book" , (done) => {
    const {id, ...data } = mocks.VALID_BOOK;

    const userStub = sandbox
      .stub(BookRepository.prototype, 'find')
    userStub
      .withArgs("7b59fd59-d860-4583-8866-c2135ba8ee3e", "id")
      .returns({
        "id": "7b59fd59-d860-4583-8866-c2135ba8ee3e",
        "user": "35b9b1ba-6048-4025-bf8e-36242d2cbb02",
        "title": "Clean Code",
        "startDateReading": "2022-01-01",
        "endDateReading": "2022-05-20",
        "status": 1
      });
    
    supertest(app)
      .put(`/book/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(
        {
          "id": "7b59fd59-d860-4583-8866-c2135ba8ee3e",
          "user": "35b9b1ba-6048-4025-bf8e-36242d2cbb02",
          "title": "Clean Code",
          "startDateReading": "2022-01-01",
          "endDateReading": "2022-05-20",
          "status": 1
        }, done)
  })

  it("should be throw exeption when update invalid book" , (done) => {
    const {id, ...data } = mocks.INVALID_BOOK_REGISTER;

    supertest(app)
      .put(`/book/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect(
        {"message": "Book with id \"35b9b1ba-6048-4025-bf8e-36242aacbb02\" Not Found!!"}
      )
      .end(done);
  })

  it("should be return status 200 when delete book" , (done) => {
    const {id, ...data } = mocks.VALID_BOOK;

    const bookStub = sandbox
      .stub(BookRepository.prototype, 'find')
    bookStub
      .withArgs("7b59fd59-d860-4583-8866-c2135ba8ee3e", "id")
      .returns({
        "id": "7b59fd59-d860-4583-8866-c2135ba8ee3e",
        "user": "35b9b1ba-6048-4025-bf8e-36242d2cbb02",
        "title": "Clean Code",
        "startDateReading": "2022-01-01",
        "endDateReading": "2022-05-20",
        "status": 1
      });
    
    supertest(app)
      .delete(`/book/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(
        {
          "message": "Book with id 7b59fd59-d860-4583-8866-c2135ba8ee3e deleted!!"
        })
      .end(done);
  })

  it("should be throw exeption when delete book" , (done) => {
    const {id, ...data } = mocks.INVALID_BOOK_REGISTER;
    
    const bookStub = sandbox
    .stub(BookRepository.prototype, 'find')
  bookStub
    .withArgs("35b9b1ba-6048-4025-bf8e-36242aacbb02", "id")
    .returns({});

    supertest(app)
      .delete(`/book/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect(
        {
          message: "Book with id \"35b9b1ba-6048-4025-bf8e-36242aacbb02\" Not Found!!"
        })
      .end(done);
  })
})

