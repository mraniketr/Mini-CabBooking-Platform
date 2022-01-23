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
const findDist = (location1, lcoation2) => {
  return Math.sqrt(
    Math.pow(location1.latitude - lcoation2.latitude, 2) +
      Math.pow(location1.longitude - lcoation2.longitude, 2)
  );
};

const findRides = async (req, res) => {
  console.log("Find Rides", req.body.currentLocation);
  users.find(
    { mode: "Driver", available: true },
    { passWord: 0 },
    (err, doc) => {
      let distance = undefined;
      let cabId;
      doc.map((x, i) => {
        console.log(x.currentLocation);
        let tempDist = findDist(req.body.currentLocation, x.currentLocation);
        console.log(tempDist);
        if (tempDist < distance || distance == undefined) {
          distance = tempDist;
          cabId = i;
        }
      });
      if (distance < process.env.thresholdDistance) {
        res.send({
          MSG: `Cab assigned Successfully at ${distance} away`,
          userDetails: doc[cabId],
        });
      } else {
        res.status(404).send({ MSG: "No Cabs nearby" });
      }
    }
  );
};

module.exports = { signup, login, toggleAvail, findRides };
