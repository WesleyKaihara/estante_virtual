const { describe, it } = require("mocha");
const { expect } = require("chai");

const supertest = require('supertest');

const server = require("../../src/server");

describe("#Server", () => {
  let app;

  before(function() {
    app = server(3000);
  });

  after(() => {
    app.close();
  });
  
  it("should be return status 200 in base url" , (done) => {
    supertest(app) 
      .get("/")
      .expect(200, done)
  })

  it("should be return a value in body" , (done) => {
    supertest(app) 
      .get("/")
      .expect({message: "Hello World"}, done)
  })

})

