const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name : {
        type :String, 
        required:[true,"please add the contact name"]
    },
    email:{
        type :String,
        required:[true,"please add the Email name"]
    },
    phome:{
        type :Number,
        required:[true,"please add the Phone Number name"]
    }
} )

module.exports=mongoose.model("Contact",contactSchema)