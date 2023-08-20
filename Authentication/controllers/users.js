const userDB ={
    users : require('../model/users.json'),
    setUsers: function(data){
        this.users=data;
    }
}

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleUser = async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(404).json({"message":'Username and password is required.'});
    } 
    // check for duplication
    const duplicate = userDB.users.find(person=>person.username === username);
    if(duplicate) return res.sendStatus(409);
    try {
        // encrypt the password
        const hashedPassword  = await bcrypt.hash(password,10);
        //store the new user
        const newUser = {"username":username,"password":hashedPassword};
        userDB.setUsers([...userDB.users,newUser]);
        await fsPromise.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({'success':`New user ${username} created`});

    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}

module.exports = {handleUser};