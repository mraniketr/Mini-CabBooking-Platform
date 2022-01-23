const mongoose = require("mongoose");

const users = mongoose.model("users");
const signup = async (req, res) => {
  console.log("SIGNUP", req.body);
  var user = new users();
  user.email = req.body.email;
  user.passWord = req.body.passWord;
  user.mode = req.body.mode;
  user.phone = req.body.phone;
  user.name = req.body.name;
  if (user.mode === "Driver") {
    user.available = false;
  }

  user.save((err, doc) => {
    if (err) res.status(500).send({ MSG: "FAILED" });
    else res.send({ MSG: "SUCCESS" });
  });
};

const login = async (req, res) => {
  console.log("LOGIN", req.body);
  let email = req.body.email;
  let passWord = req.body.passWord;

  users.find({ email, passWord }, { passWord: 0 }, (err, doc) => {
    if (err) res.status(500).send({ MSG: "FAILED", err: err });
    else {
      if (doc.length > 0) {
        res.send({ MSG: "SUCCESS", userDetails: doc });
      } else res.status(404).send({ MSG: "Usr Not found / Invalid" });
    }
  });
};

const toggleAvail = async (req, res) => {
  console.log("Toggle Avail", req.body);

  users.findOneAndUpdate(
    { _id: req.body._id },
    {
      available: req.body.newStatus,
      currentLocation: req.body.currentLocation,
    },
    (err, doc) => {
      if (err) res.status(500).send({ MSG: "FAILED", err: err });
      else {
        res.send({ MSG: "SUCCESS", userDetails: doc });
      }
    }
  );
};

const findRides = async (req, res) => {
  console.log("Find Rides", req.body);
};

module.exports = { signup, login, toggleAvail, findRides };
