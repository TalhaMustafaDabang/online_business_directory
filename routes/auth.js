const express = require('express');
const router = express();

const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('config')

router.post('/',(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).json({"message":error.details[0].message});


    User.findOne({email:req.body.email}).then((user)=>{
         if(!user) return res.status(400).json({"message":"Email/Password Not Corrent"});

         bcrypt.compare(req.body.password,user.password)
         .then((result)=>{
             if(!result) return res.status(400).json({"message":"Email/Password Not Corrent"});
            //  if(result)  return res.status(200).json({"message":"Sucess"});
            if(result) return res.send(jwt.sign({_id:user._id},"jwtKey"))


         })
    })


    // User.findOne({email:req.body.email},(err,user)=>{
    //     if(err) return res.status(400).json({"message":"Email/Password Not Corrent"});

    //     bcrypt.compare(req.body.password,user.password,(err,result)=>{
    //         if(err) return res.status(400).json({"message":"Email/Password Not Corrent"});
    //         if(result){
    //             return res.status(200).json({"message":"Sucess"});
    //         }
    //     })
    // })
})



function validate(req)
{
    const schema = {
        email : Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()
    }
    
    return Joi.validate(req,schema);
}

module.exports = router;