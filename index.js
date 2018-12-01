const express = require('express');
const app = express();


// const config = require('config');
// if(!config.get('jwtPrivateKey'))
// {
//     console.log("FATAL ERROR, jwtPrivateKey Not Fount!");
//     process.exit(1);
// }


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/businessrabta')
.then(()=>{console.log('Connected To Db')})
.catch((e)=>{console.log('Can\'t connect to db:'+e)});

app.use(express.json());



const list = require('./routes/list');
app.use('/list',list);

const user = require('./routes/users');
app.use('/signup',user);

const auth = require('./routes/auth');
app.use('/auth',auth);


const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listning On Port ${port}`)});