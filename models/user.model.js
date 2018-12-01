const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({

    name:
    {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    number:
    {
        type: String,
        required:true,
        unique:true,
        minlength: 8,
        maxlength: 30
    },
    password:
    {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
    

});

const User = mongoose.model('User',userSchema);


const validateUser = (user) =>{
    const schema = {
        name: Joi.string().required().min(3).max(25),
        email: Joi.string().required().min(5).max(50).email(),
        number: Joi.string().required().min(8).max(30),
        password: Joi.string().required().min(5).max(1024)
    }

    return Joi.validate(user, schema);
}


exports.User=User;
exports.validate=validateUser; 