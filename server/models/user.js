const mongoose= require('mongoose');

const customerSchema = new mongoose.Schema({
    name : { type : String},
    email : { type : String},
    password : {type : String},
    number : { type: Number},
    address: { type: String },
    pincode : { type: Number},
    state: { type: String }
});

const User = mongoose.model("User" , customerSchema);

module.exports =  User;
