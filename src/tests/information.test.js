const request = require("supertest");
const app = require("../../index");

describe("GET /api/information", function() {
  it("respond with json please send an email", function() {
    request(app)
      .get("/api/information")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({ message: "Please send an email" });
  });
  it("respond with json not found", function() {
    request(app)
      .get("/api/information?email=user@user.com")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(204);
  });
  it("respond with json containing a single consumer", function() {
    request(app)
      .get("/api/information?email=test@test.com")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ amount: 45 });
  });
});
