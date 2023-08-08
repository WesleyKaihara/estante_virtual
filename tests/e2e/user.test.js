const { describe, it } = require("mocha");
const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const UserRepository = require('../../src/repository/userRepository');

const supertest = require('supertest');

const server = require("../../src/server");

const mocks = {
  UPDATE_USER: require("../mocks/user/update-user-valid-body.json"),
  INVALID_USER: require("../mocks/user/invalid-user-body.json"),
  INVALID_DELETE_USER: require("../mocks/user/invalid-delete-user.json"),
}

describe("#User Routes", () => {
  let app;

  before((done) => {
    app = server(3002);
    app.once("listening", done);

    sandbox.stub(UserRepository.prototype, 'findMany').value([
      {
        "id": "a87cd144-3550-4ca0-a14a-f7f53d52a290",
        "name": "Juscelino Fernandes",
        "email": "juscelino.junior@gmail.com",
        "password": "Juscelino321@"
      },
      {
        "id": "eda4b2f6-993c-46db-9ac9-0ef052874473",
        "name": "Miguel Antonio",
        "email": "miguel.antonio@gmail.com",
        "password": "Miguel$123"
      },
      {
        "id": "47882db8-90a4-404e-ae98-fd0989597b52",
        "name": "Lais Frigério",
        "email": "laisfrigerio@hotmail.com",
        "password": "Frigerio8080@"
      }
    ])
  });

  afterEach(function() {
    app.close();
    sandbox.restore();
  });
  
  it("should be return status 200 in base url" , (done) => {
    supertest(app)
      .get("/users")
      .expect(200)
      .expect([
        {
          "id": "a87cd144-3550-4ca0-a14a-f7f53d52a290",
          "name": "Juscelino Fernandes",
          "email": "juscelino.junior@gmail.com",
          "password": "Juscelino321@"
        },
        {
          "id": "eda4b2f6-993c-46db-9ac9-0ef052874473",
          "name": "Miguel Antonio",
          "email": "miguel.antonio@gmail.com",
          "password": "Miguel$123"
        },
        {
          "id": "47882db8-90a4-404e-ae98-fd0989597b52",
          "name": "Lais Frigério",
          "email": "laisfrigerio@hotmail.com",
          "password": "Frigerio8080@"
        }
      ],done())
  })

  it("should be return status 200 in base url with stub" , (done) => {
    const response = supertest(app)
      .get("/users")
      .expect(200)
      .expect([], done)
  })

  it("should be return status 200 user body is Valid" , (done) => {
    supertest(app)
      .post("/user")
      .send({
        name: "Vinicius Dias",
        email: "vinicius.dias@gmail.com",
        password: "Vinicius321@"
      })
      .expect(200)
      .expect({
        "name": "Vinicius Dias",
        "email": "vinicius.dias@gmail.com"
      }, done)
  })

  it("should be throw exeption when user body is Invalid" , (done) => {
    const response = supertest(app)
      .post("/user")
      .send({
        "name": "Kaiky de Souza Lima",
        "password": "Kaikylima321@"
      })
      .expect(400)
      .expect({
        "message": "Name, Email, and Password are required"
      }, done)
  })

  it("should be throw exeption when password is Unsafe" , (done) => {
    const response = supertest(app)
      .post("/user")
      .send({
        "name": "Pedro do Santos",
        "email": "pedro.santos@gmail.com",
        "password": "santos123"
      })
      .expect(400)
      .expect({
        "message": "Password is not strong enough"
      }, done)
  })

  it("should be return status 200 when update user" , (done) => {
    const {id, ...data } = mocks.UPDATE_USER;

    const userStub = sandbox
      .stub(UserRepository.prototype, 'find')
    userStub
      .withArgs("eda4b2f6-993c-46db-9ac9-0ef052874473", "id")
      .returns({
        "id": "eda4b2f6-993c-46db-9ac9-0ef052874473",
        "name": "Miguel",
        "email": "miguel.antonio@gmail.com",
        "password": "Miguel0123$"
      });
    
    supertest(app)
      .put(`/user/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(
        {
          "id": "eda4b2f6-993c-46db-9ac9-0ef052874473",
          "name": "Miguel Antonio",
          "email": "miguel.antonio@gmail.com"
        }, done)
  })

  it("should be throw exeption when update invalid user" , (done) => {
    const {id, ...data } = mocks.INVALID_USER;

    supertest(app)
      .put(`/user/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect(
        {message: 'Name, Email, and Password are required'}, done
      )
  })

  it("should be return status 200 when delete user" , (done) => {
    const {id, ...data } = mocks.UPDATE_USER;

    const userStub = sandbox
      .stub(UserRepository.prototype, 'find')
    userStub
      .withArgs("eda4b2f6-993c-46db-9ac9-0ef052874473", "id")
      .returns({
        "id":"ce5da747-7d6d-4082-b66f-e223cefd0dbd",
        "name": "Joaquim Santos",
        "email": "joaquim.santos@hotmail.com",
        "password": "Joaquim8181@"
      });
    
    supertest(app)
      .delete(`/user/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(
        {
          "message": "User with id eda4b2f6-993c-46db-9ac9-0ef052874473 deleted!!"
        }, done)
  })

  it("should be throw exeption when delete user" , (done) => {
    const {id, ...data } = mocks.INVALID_DELETE_USER;
    
    supertest(app)
      .delete(`/user/${id}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect(
        {
          "message": "User with id \"ebccfe23-56c8-4c4f-b1d0-923af7147731\" Not Found!!"
        }, done)
  })
})

