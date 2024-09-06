const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(()=>{
        console.log("Connection to database successfull");
    })
    .catch(()=>{
        console.log("Connection to database unsuccessfull");
    });

const port = 4400;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})