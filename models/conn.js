const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection : " + err);
  }
});

require("./users.model");
