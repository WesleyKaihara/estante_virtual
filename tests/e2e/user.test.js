const { describe, it } = require("mocha");
const { expect } = require("chai");

const supertest = require('supertest');

const server = require("../../src/server");

describe("#User Routes", () => {
  let app;

  before((done) => {
    app = server(3001);
    app.once("listening", done);
  });

  after(function() {
    app.close();
  });
  
  it("should be return status 200 in base url" , (done) => {
    const response = supertest(app)
      .get("/users")
      .expect(200)
      .expect([], done)
  })

  it("should be return status 200 user body is Valid" , (done) => {
    const response = supertest(app)
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

  

})
