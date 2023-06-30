const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const path = require("path");
const app = express();

//routes
const authRoute = require("./routes/Auth");
const blogRoute = require("./routes/Blog");

dotenv.config();
const uri = process.env.DB_KEY;

//connection to database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Your code after successfully connecting to the database
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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
