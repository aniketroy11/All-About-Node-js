const fs = require('fs');
const path = require('path');

// In this we learn about read write files 

fs.readFile(path.join(__dirname,'files','stater.txt'),'utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})


fs.writeFile(path.join(__dirname,'files','reply.txt'),'Hello Nice to meet you.',(err)=>{
    if(err) throw err;
    console.log('write operation complete');
    
    fs.appendFile(path.join(__dirname,'files','reply.txt'),'\nSame here',(err)=>{
        if(err) throw err;
        console.log('append operation complete');

        fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt'),(err)=>{
            if(err) throw err;
            console.log('rename operation complete');
        })
    })
})


