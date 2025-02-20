const express = require('express');
const app = express();
app.use(express.json());
PORT = 3000;

let users = [
    {email:"test@gmail.com",password:"1234"},
    {email:"test1@gmail.com",password:"12234"}
]

app.get('/',async (req,res) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).send({message:"Invalid email"})
    }
    const user = users.find(user=> user.email==email)
    if(!user){
        return res.status(400).send({message:"User not found"});
    }
    res.json({message:"User retrieved successfully"});
})

app.post('/',async (req,res) => {
    const {email,password} = req.body;
    if(!email||email==''){
        return res.status(400).send({message:"Email cannot be empty/invalid email"});
    }
    if(!password||password==''){
        return res.status(400).send({message:"Password cannot be empty/invalid password"})
    }
    
    const user = users.find(user=>user.email == email&&user.password == password)
    if(!user){
        return res.status(400).send({message:"Invalid User"})
    }
    res.json({message:"Authorization successful"})
})

app.put("/update",async (req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send({message:"Invalid credentials"})
    }
    const user = users.find(user => user.email == email)
    if(!user){
        return res.status(400).send({message:"User not found"});
    }
    user.password = password;
    res.json({message:"Updated Successfully"})
})

app.delete("/delete",async (req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send({message:"Invalid credentials"})
    }
    const index = users.findIndex(user => user.email == email)
    if(index === -1){
        return res.status(400).send({message:"User not found"});
    }
    users.splice(index,1)
    res.status(200).json({message:"Deleted successfully"})
})

app.listen(PORT,()=>{
    console.log("App listening in http://localhost:3000")
});