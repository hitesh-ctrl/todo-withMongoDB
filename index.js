const express = require("express");
const {userModel,todoModel} = require('./db');
const bcrypt = require("bcrypt");
const z = require("zod")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123455";
const auth = require("./auth");
const app = express();
const PORT = 3000
app.use(express.json())
app.post('/signup', async (req, res) => {
  const requiredBody = z.object({
  username: z.string(),
  password: z.string(),
  email:zm  .email()
});
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  let error= false;
  try{
    const hashedPassword = await bcrypt.hash(password,5,)
    console.log(hashedPassword)
    await userModel.create({
      username,
      password:hashedPassword,
      email
      })
    }catch(e){
      res.send("user exists already")
      error = true;
    }
  if(!error){
    res.send("you are signed up!")
  }

  
})
app.post('/signin', async (req, res) => {
  
  const password = req.body.password;
  const email = req.body.email;

  const response = await userModel.findOne({
    email,
    
  })
  if(!response){
    res.send("user not in db")
  }
  const passwordMatch = bcrypt.compare(password,response.password)
  
  if(passwordMatch){
    const token = jwt.sign({id:response._id.toString()},JWT_SECRET);
    res.send(token);
    
  }
  else
    res.status(403).send("wrong Credentials")

})
app.get('/todos',auth,async (req,res)=>{
  user= await userModel.findOne({userId:req.userId});
  res.send(user)
})

app.listen(PORT,()=>{console.log(`runnin @ http://localhost:${PORT}`)})