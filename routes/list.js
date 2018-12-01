const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');


const listSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
    },
    email:
    {
        type: String,
        unique: true,
        minlength: 4,
        maxlength: 50,
    },
    city:
    {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    address:
    {
        type: String,
        minlength: 4,
        maxlength: 50,
    },
    number:[String],
    discription:
    {
        type: String,
        minlength: 20,
        maxlength: 300
    },
    fax:[String],
    isVerified:
    {
        type:Boolean,
        default: false,
    }
});

const List = mongoose.model('List',listSchema);




router.get('/',(req,res)=>{
    List.find().sort('name').then((e)=>{res.send(e)});
});


router.post('/', (req,res)=>{
    const { error } = validateList(req.body);
    if(error) return res.status(400).json({message : error.details[0].message});

    const list = List({
        name: req.body.name,
        email:req.body.email,
        address: req.body.address,
        city: req.body.city,
        fax: req.body.fax,
        number: req.body.number,
        discription: req.body.discription

    });

    list.save().then((list)=>{res.status(200).json({message:"added sucessfully!"})}).catch(e=>{alert(e)});


});

module.exports= router;












const Joi = require('joi');
function validateList(list)
{
    const schema = {
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().min(4).max(50).email(),
        city: Joi.string().min(3).max(20),
        address: Joi.string().min(4).max(50),
        number: Joi.array().items(Joi.string()),
        discription: Joi.string().min(20).max(300),
        fax: Joi.array().items(Joi.string()),
        isVerified: Joi.boolean()

    }

    return Joi.validate(list,schema)
}
