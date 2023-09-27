const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const Patient = require("./mongoschema");
const cors = require("cors");
const app = express();
const nodemon = require("nodemon");
const port = 8108;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/getlist", async(req, res) => {
    const result = await Patient.find({}).sort({ time: 1 });
    console.log('Data from MongoDB:', result);
    res.send(result);
});
app.post("/approve", async(req, res) => {
    try{
        Patient.deleteMany({_id:req.body.id}).then((m)=>{
            console.log(m);
            res.send("success");
        }).catch((e)=>{
            console.log(e.message);
            res.send("error");
        })
        
    }catch(error){
        console.log("Error");
        res.send("error");
    }
});

app.post("/register", (req, res) => {
    const data = {
        name:req.body.patientName,
        email:req.body.patientEmail,
        phone:req.body.patientPhone,
        age:req.body.patientAge,
        gender:req.body.patientGender,
        caseType:req.body.caseStatus,
    }
    console.log(data);
    try{
        Patient.insertMany([data]).then((m)=>{
            console.log(m);
            res.send("success");
        }).catch((e)=>{
            console.log(e.message);
            res.send("error");
        })
        
    }catch(error){
        console.log("Error");
        res.send("error");
    }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
