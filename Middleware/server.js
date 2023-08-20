// what is middleware -
// it will be anything between the request and the respose.
// middleware gets executed after the server receives the request
// and before the controller actions send the response.

const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5500;

// built-in middleware to handle urlencoded data
// in another word form data
app.use(express.urlencoded({extended:false}));

// built-in middleware for json
// this is middleware is used to parses the incoming request object as a json object.
app.use(express.json());

// express provid a middleware express.static(), it accepts two 

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/start',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'views','start.txt'))
})

app.get('/files',(req,res)=>{
    res.sendFile(path.join(__dirname,'StaticFiles','img1.jpg'));
})

app.post('/input',(req,res)=>{
    const {name} = req.body;
    res.send(`Welcome ${name} Kumar`);
})

app.get('/*',(req,res)=>{
    
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})



app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error",error);
    }
});
