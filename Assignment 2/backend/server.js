const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const userDataRoute = require("./routes/userDataRoute");
const postDataRoute = require("./routes/postDataRoute");
const auth = require("./middlewares/auth");

app.use(express.json());
app.use(cors());
// Connect to mongodb database(locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

app.use("/api/users", userDataRoute);
app.use("/api/posts", auth, postDataRoute);
