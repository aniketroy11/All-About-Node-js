const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleUser = async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(404).json({"message":'Username and password is required.'});
    } 
    // check for duplication
    const duplicate = await User.findOne({username:username}).exec();
    if(duplicate) return res.sendStatus(409);
    try {
        // encrypt the password
        const hashedPassword  = await bcrypt.hash(password,10);
        //create and store the new user
        const result = await User.create({
            "username":username,
            "password":hashedPassword
        });
        
        console.log(result);
        res.status(201).json({'success':`New user ${username} created`});

    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}

module.exports = {handleUser};