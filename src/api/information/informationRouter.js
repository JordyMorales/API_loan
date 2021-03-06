const express = require("express");
const data = require("../../DataBase/database");
const informationRouter = express.Router();

informationRouter.get("/", async (req, res) => {
  const { email } = req.query;
  const currentAmount = await data.findByEmail(email);
  if (!email) {
    res
      .status(400)
      .json({ message: "Please send an email" })
      .send();
  }
  if (currentAmount == undefined) {
    res.status(204).send();
  } else {
    res.status(200).json({ amount: currentAmount });
  }
});

module.exports = informationRouter;
