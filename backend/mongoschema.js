const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/Patient").then(()=>{
    console.log("Connect TO DB");
}).catch((error)=>{
    console.log("error");
})  

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  caseType: {
    type: String,
    required: true
  },
  time:{
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model using the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
