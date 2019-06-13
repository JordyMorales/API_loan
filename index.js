const express = require("express");
const loanRouter = require("./src/api/loan/loanRouter");
const paymentsRouter = require("./src/api/payments/paymentsRouter");
const informationRouter = require("./src/api/information/informationRouter");

const port = 8080;
const app = express();

app.use(express.json());
app.use("/api/loan", loanRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/information", informationRouter);

app.listen(port, () => console.log(`listening on port ${port}!`));
