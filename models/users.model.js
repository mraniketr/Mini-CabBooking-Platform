const mongoose = require("mongoose");

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
});

mongoose.model("users", usersSchema);
