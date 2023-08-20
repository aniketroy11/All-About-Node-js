const User = require('../model/User');

const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req,res)=>{
   const cookies = req.cookies
    if(!cookies?.jwt){
        res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const existUser = await User.findOne({refreshToken});
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