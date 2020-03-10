const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../index"),
  should = chai.should();

chai.use(chaiHttp);

describe("Borrowers", function() {
  it("should list ALL Borrowers", function(done) {
    chai
      .request(server)
      .get("/borrowers")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("_id");
        res.body[0].should.have.property("loans");
        done();
      });
  });
});
