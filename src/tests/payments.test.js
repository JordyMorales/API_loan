const request = require("supertest");
const app = require("../../index");

describe("POST /api/payments", () => {
  let data = {
    email: "test3@test.com",
    amount: 50
  };
  it("respond with we cannot accept the payment", done => {
    request(app)
      .post("/api/payments")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ message: "we cannot accept the payment" })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/payments", () => {
  let data = {
    email: "test4@test.com",
    amount: 50
  };
  it("respond with No Debt", done => {
    request(app)
      .post("/api/payments")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ error: 101, message: "No Debt" })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/payments", () => {
  let data = {
    email: "test@test.com",
    amount: 150
  };
  it("respond with amount exceeds debt", done => {
    request(app)
      .post("/api/payments")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ error: 100, message: "Amount exceeds debt" })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /api/payments", () => {
  let data = {
    email: "test@test.com",
    amount: 40
  };
  it("respond with successful payment", done => {
    request(app)
      .post("/api/payments")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .expect({ message: "successful payment", debt: 5 })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
