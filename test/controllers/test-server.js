const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../../index"),
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

describe("Checkout Book", () => {
  it("Should successfully checkout a book", (done) => {
    chai
      .request(server)
      .post("/loans")
      .send({
        borrowerId: "5e66949385ed682e1800f4a2",
        bookId: "5e66949385ed682e1800f4a5",
        branchId: "5e66949485ed682e1800f4a8"
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("Should respond with a 404 (borrower not found)", (done) => {
    chai
      .request(server)
      .post("/loans")
      .send({
        borrowerId: "5e66949385ed682e1800f4bc",
        bookId: "5e66949385ed682e1800f4a5",
        branchId: "5e66949485ed682e1800f4a8"
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
