const express = require("express");
const data = require("../../DataBase/database");
const paymentsRouter = express.Router();

paymentsRouter.post("/", async (req, res) => {
  const { email, amount } = req.query;
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
      return res.status(200).json({ message: "No Debt" });
    }

    if (parseInt(amount) > parseInt(currentAmount)) {
      return res.status(200).json({ message: "Amount exceeds debt" });
    } else {
      const newDebt = await data.setByEmail(
        email,
        parseInt(amount) - parseInt(currentAmount)
      );
      res.status(200).json({ message: "successful payment", Debt: newDebt });
    }
  }
});

module.exports = paymentsRouter;
