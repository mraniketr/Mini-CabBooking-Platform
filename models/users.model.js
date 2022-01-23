const mongoose = require("mongoose");
const { object } = require("webidl-conversions");

var usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
  },
  available: {
    type: Boolean,
  },
  currentLocation: {
    type: Object,
  },
  driverDetails: {
    type: Object,
  },
});

mongoose.model("users", usersSchema);
