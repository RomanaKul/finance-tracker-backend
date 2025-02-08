require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRouter = require("./routes/auth");
const enterpriseRouter = require("./routes/enterprises");
const indicatorRouter = require("./routes/indicators");
const dynamicRouter = require("./routes/dynamics");
const currencyRateRouter = require("./routes/currencyRate");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

// Routes
app.use("/auth", userRouter);
app.use("/enterprises", enterpriseRouter);
app.use("/indicators", indicatorRouter);
app.use("/dynamics", dynamicRouter);
app.use("/currency-rates", currencyRateRouter);
