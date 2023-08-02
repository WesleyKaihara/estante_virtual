const { describe, it } = require("mocha");
const { expect } = require("chai");

const superagent = require('superagent');
const server = require("../../src/server");

describe("#User Routes", () => {
  let app;

  before(function() {
    app = server(3001);
  });

  after(function() {
    app.close();
  });
  
  it("should be return status 200 in base url" , () => {
    superagent 
      .get("http://localhost:3001/users")
      .end((err,res) => {
        expect(res.statusCode)
          .to.be.equal(200)
        expect(res.body)
          .to.be.deep.equal({ "message": "GET User" })
      })
  })

})

