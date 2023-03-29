const express = require('express');
const sequelize  = require('./utils/database');


const app = express();


const userRoute = require('./routes/users');
const clientRoute = require('./routes/client');

require('dotenv').config();

app.use(express.json());

app.use('/',userRoute);
app.use('/',clientRoute)



sequelize.sync({force:false}).then(result=>{
    console.log(result)
}).catch((err)=>{
    console.log(err);
})





app.listen(4000);
