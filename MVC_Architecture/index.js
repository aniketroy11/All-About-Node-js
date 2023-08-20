const express = require('express');
const app = express();
const path = require('path');



const PORT = process.env.PORT || 3500;

// built-in middleware for json
// this is middleware is used to parses the incoming request object as a json object.
app.use(express.json());

app.use('/employee',require("./routes/api/employee"));
app.use('/*',require('./routes/root'));

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error",error);
    }
});
