const request = require("supertest");
const app = require("../../index");

describe("POST /api/loan", () => {
  let data = {
    email: "test2@test.com",
    amount: 50
  };
  it("respond with 201 created", done => {
    request(app)
      .post("/api/loan")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/loan", () => {
  let data = {
    email: "test2@test.com",
    amount: 50
  };
  it("respond with 201 created", done => {
    request(app)
      .post("/api/loan")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .expect({ debt: 100 })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/loan", () => {
  let data = {
    email: "test3@test.com",
    amount: 55
  };
  it("respond with we cannot accept loans over 50$ on first loan", done => {
    request(app)
      .post("/api/loan")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ message: "We cannot accept loans over 50$ on first loan" })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/loan", () => {
  let data = {
    email: "test2@test.com",
    amount: 1000
  };
  it("respond with Amount exceeded", done => {
    request(app)
      .post("/api/loan")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ error: 100, message: "Amount exceeded" })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
