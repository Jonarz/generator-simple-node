import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../src/app";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing the users endpoints:", () => {
  it("It should create a user", done => {
    const user = {
      username: "test user",
      password: "test123"
    };
    chai
      .request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          username: user.username
        });
        done();
      });
  });

  it("It should not create a book with incomplete parameters", done => {
    const user = {
      password: "test123"
    };
    chai
      .request(app)
      .post("/api/v1/books")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it("It should get all users", done => {
    chai
      .request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("username");
        res.body.data[0].should.have.property("password");
        done();
      });
  });

  it("It should get a particular user", done => {
    const userId = 1;
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("username");
        res.body.data.should.have.property("password");
        done();
      });
  });

  it("It should not get a particular user with invalid id", done => {
    const userId = 8888;
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.error.status).to.equal(404);
        console.log(res.body.message);
        expect(res.body.message).to.equal("Cannot find User  with the id 8888");
        done();
      });
  });

  it("It should not get a particular user with non-numeric id", done => {
    const userId = "aaa";
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.error.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update a user", done => {
    const userId = 1;
    const updatedUser = {
      id: userId,
      username: "new username"
    };
    chai
      .request(app)
      .put(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedUser.id);
        expect(res.body.data.username).equal(updatedUser.username);
        done();
      });
  });

  it("It should not update a user with invalid id", done => {
    const userId = "9999";
    const updatedUser = {
      id: userId,
      username: "new username 2"
    };
    chai
      .request(app)
      .put(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .send(updatedUser)
      .end((err, res) => {
        expect(res.error.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find User  with the id: ${userId}`);
        done();
      });
  });

  it("It should not update a user with non-numeric id value", done => {
    const userId = "ggg";
    const updatedUser = {
      id: userId,
      title: "new username 3"
    };
    chai
      .request(app)
      .put(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .send(updatedUser)
      .end((err, res) => {
        expect(res.error.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should not delete a user with invalid id", done => {
    const userId = 777;
    chai
      .request(app)
      .delete(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`User  with the id ${userId} cannot be found`);
        done();
      });
  });

  it("It should not delete a book with non-numeric id", done => {
    const userId = "bbb";
    chai
      .request(app)
      .delete(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please provide a numeric value");
        done();
      });
  });

  it("It should delete a user", done => {
    const userId = 1;
    chai
      .request(app)
      .delete(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });
});
