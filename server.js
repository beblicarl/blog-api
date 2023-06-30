const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const path = require("path");
const app = express();

//routes
const authRoute = require("./routes/Auth");
const blogRoute = require("./routes/Blog");

dotenv.config();

//connection to database
mongoose
  .connect(process.env.DB_KEY)
  .then(console.log("CONNECTED TO DATABSE"))
  .catch((err) => console.log(err));

//Middleware
app.use(express.json());

app.use("/api/v1", authRoute);
app.use("/api/v1/blog", blogRoute);

app.get("/api/v1/health", (req, res) => {
  res.send("Health is ok!");
});

//listening to server

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
