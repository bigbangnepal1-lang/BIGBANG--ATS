
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

let jobs = [];
let candidates = [];

app.post('/api/jobs',(req,res)=>{
  jobs.push(req.body);
  res.json(req.body);
});

app.get('/api/jobs',(req,res)=>res.json(jobs));

app.post('/api/candidates',(req,res)=>{
  const {name,skills,jobSkills} = req.body;
  let match = skills.filter(s=>jobSkills.includes(s)).length;
  let score = Math.round((match/jobSkills.length)*100);
  const candidate = {name,skills,score};
  candidates.push(candidate);
  res.json(candidate);
});

app.get('/api/candidates',(req,res)=>res.json(candidates));

app.listen(5000,()=>console.log("Server running"));
