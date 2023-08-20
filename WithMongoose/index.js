require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 5500;

// built-in middleware for json
// this is middleware is used to parses the incoming request object as a json object.
app.use(express.json());
// middleware for cookies for json
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use('/register',require('./routes/api/userRoutes'));
app.use('/auth',require('./routes/api/authRoutes'));
app.use('/refresh',require('./routes/api/refreshRoutes'));
app.use('/logout',require('./routes/api/logoutRoutes'));

app.use(verifyJWT);
app.use('/employee',require("./routes/api/employee"));

mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser:true , useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
.catch((error)=>console.log(error));


 