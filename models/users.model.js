const mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  passWord: {
    type: String,
  },
  mode: {
    type: String,
  },
});

mongoose.model("users", usersSchema);
