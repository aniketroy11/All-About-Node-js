
const express = require('express');
const app = express();
const path = require('path');

const userRoute = require("./subdir.js");
const employeeRoute = require("./api/employee.js");


const PORT = process.env.PORT || 6500;


// built-in middleware for json
// this is middleware is used to parses the incoming request object as a json object.
app.use(express.json());

// express provid a middleware express.static(), it accepts two 

app.use('/subdir',userRoute);
app.use('/employee',employeeRoute);

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error",error);
    }
});
