const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connection to database successfull");
    })
    .catch(()=>{
        console.log("Connection to database unsuccessfull");
    });

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})