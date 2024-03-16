const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
 
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

  mongoose.connect(process.env.MONGODB_PASSWORD);
  console.log("Mongodb connected")
 

// Registration Schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Model for Registration
const Registration = mongoose.model("registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Pages/index.html");
})

app.get("/", async (req, res) => {
      res.sendFile(__dirname + "/Pages/index.html");
 }
 );

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await Registration.findOne({ email: email });

        if (!existingUser) {
            const registrationData = new Registration({
                name,
                email,
                password,
            });

            await registrationData.save();
            res.redirect('/success');
        } else {
            console.log("user already exists");
            res.redirect('/error');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
});

app.get("/success", async (req, res) => {
      res.sendFile(__dirname + "/Pages/success.html");
});

app.get("/error", async (req, res) => {
       res.sendFile(__dirname + "/Pages/error.html");
});



// app.use("/", registrationRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
