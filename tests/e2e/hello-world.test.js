const { describe, it } = require("mocha");
const { expect } = require("chai");

const superagent = require('superagent');
const server = require("../../src/server");

describe("#Server", () => {
  let app;

  before(function() {
    app = server(3000);
  });

  after(function() {
    app.close();
  });
  
  it("should be return status 200 in base url" , () => {
    superagent 
      .get("http://localhost:3000/")
      .end((err,res) => {
        expect(res.statusCode)
          .to.be.equal(200)
      })
  })

  it("should be return a value in body" , () => {
    superagent 
      .get("http://localhost:3000/")
      .end((err,res) => {
        expect(res.body)
          .to.be.deep.equal({ message: 'Hello World' })
      })
  })

})

