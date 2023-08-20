const User = require('../model/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({"message":"username and password are required"});
    }
    const existUser =await User.findOne({username:username});
    if(!existUser) return res.sendStatus(401); // unathorised

    // evaluate password
    const match = await bcrypt.compare(password,existUser.password);
    if(match){
        // this is the their where we create jwts
        const accessToken = jwt.sign(
            {username:existUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        const refreshToken = jwt.sign(
            {username:existUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        
        // saving refreshToken with current user
        existUser.refreshToken = refreshToken;
        const result = await existUser.save();
        console.log(result);

        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',maxAge:24*60*60*1000});
        res.json({accessToken});
    }
    else{
        res.sendStatus(401);
    }

}

module.exports = {handleLogin};