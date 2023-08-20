const userDB ={
    users : require('../model/users.json'),
    setUsers: function(data){
        this.users=data;
    }
}

const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;


const handleLogin = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({"message":"username and password are required"});
    }
    const existUser = userDB.users.find(person=>person.username===username);
    if(!existUser) return res.sendStatus(401); // unathorised

    // evaluate password
    const match = await bcrypt.compare(password,existUser.password);
    if(match){
        // this is the their where we create jwts
        const accessToken = jwt.sign(
            {username:existUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        );
        const refreshToken = jwt.sign(
            {username:existUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        
        // saving refreshToken with current user
        const otherUser = userDB.users.filter(person=>person.username !== existUser.username);
        const currUser = {...existUser,refreshToken};
        userDB.setUsers([...otherUser,currUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});

        res.json({accessToken});
    }
    else{
        res.sendStatus(401);
    }

}

module.exports = {handleLogin};