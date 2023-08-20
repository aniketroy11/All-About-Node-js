const userDB ={
    users : require('../model/users.json'),
    setUsers: function(data){
        this.users=data;
    }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleRefreshToken = (req,res)=>{
   const cookies = req.cookies
    if(!cookies?.jwt){
        res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const existUser = userDB.users.find(person=>person.refreshToken===refreshToken);
    if(!existUser) return res.sendStatus(403); // forbidden

    // evaluate password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || existUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn:'60s'}
            );
            res.json({accessToken})
        }
    );
}

module.exports = {handleRefreshToken}