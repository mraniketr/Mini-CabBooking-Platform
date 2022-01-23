const mongoose = require("mongoose");

const users = mongoose.model("users");
const signup = async (req, res) => {
  console.log("SIGNUP", req.body);
  var user = new users();
  user.email = req.body.email;
  user.password = req.body.passWord;
  user.mode = req.body.mode;
  user.save((err, doc) => {
    if (err) res.send({ MSG: "FAILED" });
    else res.send({ MSG: "SUCCESS" });
  });
};

module.exports = { signup };
