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

router.post('/getdata', async (req, res) =>{
    try{
        var token = req.body.token;
        if(token === null){
            res.send({status : 0, message : "Token does not match"})
        }else{
            jwt.verify(token , SECRET_KEY, async function(err, decode){
                if(err){
                    res.send({status : 0, message : "Token does not match"})
                }
                var data = await User.findOne({email : decode.email})
                res.send({status : 1 , tokenData : data})
            })    
        }
    }
    catch(error){
        console.log(error);
    }
})


module.exports = router;