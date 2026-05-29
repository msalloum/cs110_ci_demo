require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

module.exports = app;

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
