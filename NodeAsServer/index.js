// create web server using node without any framework
// we use http module to create server

// http module provide createServer() method to create 
// server

const http = require('http');
const fs = require('fs');
const path = require('path');


const  PORT = process.env.PORT || 8000;


// first server

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write('hello world');
//     res.end();
// });


// read file through server
const server =http.createServer((req,res)=>{

    switch(req.url){
        case '/':
            fs.readFile(path.join(__dirname,'files','demo.html'),'utf-8',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            });
            break;
        case '/start':
            fs.readFile(path.join(__dirname,'files','stater.txt'),'utf-8',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            });
            break;
        case '/data':
            fs.readFile(path.join(__dirname,'files','data.json'),(err,data)=>{
                res.writeHead(200,{'Content-Type':'application/json'});
                res.write(data);
                res.end();
            });
            break;
        default:
            fs.readFile(path.join(__dirname,'files','404.html'),'utf-8',(err,data)=>{
                res.writeHead(404,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            });
            break;
    }
    
});

server.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

