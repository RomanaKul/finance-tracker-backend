require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}.`)
      );
})
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successful response.");
});




