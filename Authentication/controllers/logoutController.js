const userDB ={
    users : require('../model/users.json'),
    setUsers: function(data){
        this.users=data;
    }
}

const fsPromises = require('fs').promises;
const e = require('express');
const path = require('path');




const handleLogout = async(req,res)=>{
    // on client also delete the accessToken

   const cookies = req.cookies
    if(!cookies?.jwt){
        res.sendStatus(204); // no content 
    }
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const existUser = userDB.users.find(person=>person.refreshToken===refreshToken);
    if(!existUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.sendStatus(204); // forbidden
    }

    // now delete the refreshToken in db
    const otherUser = userDB.users.filter(person=>person.refreshToken !== existUser.refreshToken);
    const currUser = {...existUser,refreshToken:''};
    userDB.setUsers([...otherUser,currUser]);
    await fsPromises.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users)
    );
    res.clearCookie('jwt',{httpOnly:true});
    res.sendStatus(204);

}

module.exports = {handleLogout}