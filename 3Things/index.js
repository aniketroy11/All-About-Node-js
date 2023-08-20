// create a server
// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromise = require('fs').promises;

// const PORT = process.env.PORT || 5000;

// const server = http.createServer((req,res)=>{
//     console.log(req.url,req.method);
// });

// server.listen(PORT,()=>console.log(`server is running on port : ${PORT}`));

// create web server using express
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname});
    // another way to send file
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.get('/start',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'views','start.txt'))
})
app.get('/*',(req,res)=>{
    
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT,()=>console.log(`Server is running on port : ${PORT}`));
