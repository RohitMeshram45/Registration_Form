const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://Rohit_Registration:${password}@cluster0.ubsfljy.mongodb.net/`, {
    
})

//  Registration Schema 
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// mode of registration 

const registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Pages/index.html");
})

app.post('/register', async (req, res) => {

    try {
        const {name, email, password} = req.body;

        const existingUser =await registration.findOne({email : email})
 
        if(!existingUser){
            

        const registrationData = new registration({
            name,
            email,
            password,
        })

       await registrationData.save();

       res.redirect('/sucess')
    }
    else{
        console.log("user already exista")
        res.redirect('/error')
    }
    } catch (err) {
        res.redirect('/error')
        console.log(err)
    }

})

app.get("/sucess",(req, res)=>{
    res.sendFile(__dirname + "/Pages/success.html");
})

app.get("/error",(req, res)=>{
    res.sendFile(__dirname + "/Pages/error.html");
})


app.listen(port, () => {
    console.log(`Server is runiing ${port}`)
})