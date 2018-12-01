const { User, validate } = require('../models/user.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/',(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).json({'message':error.details[0].message})

    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user) return res.status(400).json({'message':"User Already Exists!"})
        user= new User(_.pick(req.body,['name','email','number','password']));
    
        // bcrypt.genSalt(10,(err,salt)=>{
        //     if(err) return res.status(404).json({"message":err})

            
        //     bcrypt.hash(req.body.password,salt,(err,encrypted)=>{
        //         if(err) return res.status(404).json({"message":err})
        //         user.password=encrypted;
        //         user.save()
        //         .then((user)=>{res.send(_.pick(user,['_id']))})
        //         .catch(e=> {return res.status(404).json({"message":e.message})})
           

        //     });
            
        // });

        bcrypt.genSalt(10)
        .then((salt)=>{
            bcrypt.hash(req.body.password,salt)
            .then((hash)=>{
                user.password=hash;
                user.save()
                .then((user)=>{
                    // token=(jwt.sign({_id:user._id},"jwtKey"))
                    res.header('x-header-token',jwt.sign({_id:user._id},"jwtKey")).send(_.pick(user,['_id']));
                })
            })
        })
        .catch(e=>{return res.status(404).json({"message":err})});
      

    })
});




module.exports=router;