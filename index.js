const express = require("express");
const {userModel,todoModel} = require('./db');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123455";
const auth = require("./auth");
const app = express()
const PORT = 3000
app.use(express.json())
app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  await userModel.create({
    username,
    password,
    email
  })
  res.send("you are signed up!")
})
app.post('/signin', async (req, res) => {
  
  const password = req.body.password;
  const email = req.body.email;

  const response = await userModel.findOne({
    email,
    password
  })
  
  if(response){
    const token = jwt.sign({id:response._id.toString()},JWT_SECRET);
    res.header('token',token);
    res.send("token sent in header")
  }
  else
    res.status(403).send("wrong Credentials")

})
app.get('/todos',auth,async (req,res)=>{
  user= await userModel.findOne({userId:req.userId});
  res.send(user)
})

app.listen(PORT,()=>{console.log(`runnin @ http://localhost:${PORT}`)})