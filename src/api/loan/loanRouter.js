const express = require("express");
const data = require("../../DataBase/database");
const loanRouter = express.Router();

const MAX = 1000;

loanRouter.post("/", async (req, res) => {
  const { email, amount = 0 } = req.body;
  const currentAmount = await data.findByEmail(email);
  if (!email || !amount) {
    res
      .status(400)
      .json({ message: "Please send an email and the amount" })
      .send();
  }
  if (currentAmount == undefined) {
    if (amount > 50) {
      res
        .status(200)
        .json({ message: "We cannot accept loans over 50$ on first loan" });
    } else {
      const newAmount = await data.setByEmail(email, amount);
      return res.status(201).json({ Debt: newAmount });
    }
  } else {
    const debt = currentAmount + amount;
    console.log(debt);
    if (debt > MAX) {
      return res.status(200).json({ message: "Amount exceeded" });
    } else {
      const newLoan = await data.setByEmail(email, currentAmount + amount);
      return res.status(200).json({ Debt: newLoan });
    }
  }
});

module.exports = loanRouter;
