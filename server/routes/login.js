const express = require("express")
const router = express.Router()

const cors = require("cors");
const bodypars= require('body-parser')
router.use(cors());
router.use(bodypars.json())

const db= require("../config/db");
const User = require('../models/user') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

db();

const SECRET_KEY = "mskjwuyrefhdbgfrasiwndicn";

router.post('/login', async(req, res) =>{
    try{
        const data = await User.findOne({email : req.body.email})
        if(!data){
            res.send({status : 0, message : "User does not exist"})
        }
        else{
            var isMatched = await bcrypt.compare(req.body.password, data.password)
            if(!isMatched){
                res.send({status : 0, message : "Incorrect Password"})
            }else{
                var token = jwt.sign({id : data._id, email : data.email}, SECRET_KEY)
                res.send({status : 1, token : token})
            }
           
        }
       
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;