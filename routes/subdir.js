const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/start',(req,res)=>{
    res.sendFile(path.join(__dirname,'files','demo.html'));
   
});

router.get('/404',(req,res)=>{
    res.sendFile(path.join(__dirname,'files','404.html'));
});

router.get('/datas',(req,res)=>{
    res.sendFile(path.join(__dirname,'files','data.json'));
  
});

module.exports = router;