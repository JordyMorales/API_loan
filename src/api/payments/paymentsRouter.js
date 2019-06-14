const express = require("express");
const data = require("../../DataBase/database");
const paymentsRouter = express.Router();

paymentsRouter.post("/", async (req, res) => {
  const { email, amount } = req.body;
  const currentAmount = await data.findByEmail(email);

  if (!email || !amount) {
    res
      .status(400)
      .json({ message: "Please send an email and the amount" })
      .send();
  }

  if (currentAmount == undefined) {
    res
      .status(200)
      .json({ message: "we cannot accept the payment" })
      .send();
  } else {
    if (currentAmount == 0) {
      return res.status(200).json({ error: 101, message: "No Debt" });
    }

    if (amount > currentAmount) {
      return res
        .status(200)
        .json({ error: 100, message: "Amount exceeds debt" });
    } else {
      const newDebt = await data.setByEmail(email, currentAmount - amount);
      return res
        .status(201)
        .json({ message: "successful payment", debt: newDebt });
    }
  }
});

module.exports = paymentsRouter;
