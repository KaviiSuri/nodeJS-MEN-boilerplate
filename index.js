const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");

require("dotenv").config();
const app = express();

const PORT = process.env.port || 5000;

// for parsing body
app.use(express.json());

// router setup
app.use("/", routes);

// Database Connection and server listen...
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-sndxq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(
        `Server started at PORT:${PORT}\nYou can access it at http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
