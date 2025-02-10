require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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
app.use("/api/auth", userRouter);
app.use("/api/enterprises", enterpriseRouter);
app.use("/api/indicators", indicatorRouter);
app.use("/api/dynamics", dynamicRouter);
app.use("/api/currency-rates", currencyRateRouter);
