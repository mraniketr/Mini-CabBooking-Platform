const express = require("express");
require("dotenv").config();
require("./models/conn");
const Service = require("./Service");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/signUp", Service.signup);

app.get("/SERVERTESTAPI", (req, res) => {
  res.send({ express: "SERVER RUNNING" });
});
