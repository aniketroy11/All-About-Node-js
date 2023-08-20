const express = require('express');
const app = express();
const path = require('path');

const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 4400;

// built-in middleware for json
// this is middleware is used to parses the incoming request object as a json object.
app.use(express.json());

// middleware for cookies for json
app.use(cookieParser());

app.use('/register',require('./routes/api/userRoutes'));
app.use('/auth',require('./routes/api/authRoutes'));
app.use('/refresh',require('./routes/api/refreshRoutes'));
app.use('/logout',require('./routes/api/logoutRoutes'));



app.use(verifyJWT);
app.use('/employee',require("./routes/api/employee"));


app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error",error);
    }
});
 