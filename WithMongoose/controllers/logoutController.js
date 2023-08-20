const User = require('../model/User');

const path = require('path');


const handleLogout = async(req,res)=>{
    // on client also delete the accessToken

   const cookies = req.cookies
    if(!cookies?.jwt){
        res.sendStatus(204); // no content 
    }
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const existUser = await User.findOne({refreshToken});
    if(!existUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204); // forbidden
    }

    // now delete the refreshToken in db
    existUser.refreshToken = '';
    const result = await existUser.save();
    console.log(result);
    
    res.clearCookie('jwt',{httpOnly:true});
    res.sendStatus(204);

}

module.exports = {handleLogout}