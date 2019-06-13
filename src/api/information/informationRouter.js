const express = require("express");
const informationRouter = express.Router();

const initialData = { "user@test.com": 100, "daniel@example.com": 50 };
const data = require("../../Database/database")(initialData);

informationRouter.get("/", async (req, res) => {
  const { email } = req.query;
  const client = await data.findByEmail(email);
  if (!email) {
    res
      .status(400)
      .json({ message: "Please send an email" })
      .send();
  }
  if (!client) {
    res.status(204).send();
  } else {
    res.status(200).json(client);
  }
});

module.exports = informationRouter;
