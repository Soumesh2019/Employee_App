const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  picture: String,
  salary: String,
  job: String,
});

mongoose.model("employee", Schema);
