const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const userRouter = require("./routes/users");
const app = express();

// CORS Middleware
app.use(cors());

// DB Configuration
const db = require("./config/keys").mongoURI;

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", userRouter);

// Connect to the database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error(err));
