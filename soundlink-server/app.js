const fs = require("fs");

const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");

const usersRoute = require("./routes/users-route");
const matchesRoute = require("./routes/matches-route");
const adminRoute = require("./routes/admin-routes");

const HttpError = require("./models/http-error");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/matches", matchesRoute);
app.use("/api/admin", adminRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.lhyriqv.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => {
    app.listen(process.env.PORT || 3100);
  })
  .catch((err) => {
    console.log(err);
  });
