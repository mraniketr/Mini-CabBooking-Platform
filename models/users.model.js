const mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  passWord: {
    type: String,
  },
  mode: {
    type: String,
  },
  available: {
    type: Boolean,
  },
});

mongoose.model("users", usersSchema);
