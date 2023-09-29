const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to the database
mongoose
  .connect(
    "mongodb+srv://kareemelzeky:JYkn12cTO8Rh1E73@cluster0.ssrqnn5.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error(err));
