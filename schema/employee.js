const mongoose = require("mongoose");
//const { Int32: NumberInt } = require('mongodb');

const employeeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  phoneNumber: {type: String, required: true},
  yearsOfExp: {type: Number},
  department: {type: String, required: true},
  skills: {type: [String]}
  
}, {collection: "employees"})

module.exports = mongoose.model("employee", employeeSchema);