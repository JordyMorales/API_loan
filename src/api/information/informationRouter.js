const express = require("express");
const data = require("../../Database/database");
const informationRouter = express.Router();

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
