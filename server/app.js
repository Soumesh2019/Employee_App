require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
require("./Model/Employee");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set(express.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://soumesh:${process.env.DB_PASSWORD}@employeesdata.u5zhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => console.log("Mongodb Connected"));
mongoose.connection.on("error", () => console.log("Monogo not connected"));

const Employee = mongoose.model("employee");

app.get("/", (req, res) => {
  Employee.find({}, (err, result) => {
    if (!err) {
      res.send(result);
    } else res.send(err);
  });
});

app.post("/send", (req, res) => {
  const { name, email, phone, job, salary, picture } = req.body;

  const employee = new Employee({
    name,
    email,
    phone,
    job,
    salary,
    picture,
  });

  employee
    .save()
    .then((data) => {
      console.log(data);
      res.json("Success");
    })
    .catch((e) => console.error(e));
});

app.post("/delete", (req, res) => {
  const { _id } = req.body;

  Employee.findByIdAndRemove({ _id }, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

app.post("/update", (req, res) => {
  const { name, email, phone, job, salary, _id } = req.body;

  Employee.findByIdAndUpdate(
    { _id },
    { $set: { name, email, phone, job, salary } },
    (err, result) => {
      if (!err) {
        res.send(result);
      } else res.send(err);
    }
  );
});

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
