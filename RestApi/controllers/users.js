import { v4 as uuidv4 } from 'uuid';

let users =[];

export const getusers = (req, res) => {
    console.log(users);
    res.send(users);
}

export const createUsers = (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() });
    res.send(`User with the name ${user.firstname} ${user.lastname}`);
}

export const getUserById = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
}

export const deleteUser = (req,res)=>{
    const {id }= req.params;
    users = users.filter((user)=> user.id !== id);
    res.send(`user is deleted of id ${id}`);
 }

 export const updateUser = (req,res)=>{
    const {firstname,lastname,age}  = req.body;
    const {id} = req.params;
    const updatedUser = users.find((user)=> user.id ===id);

    if(firstname) updatedUser.firstname = firstname
    if(lastname) updatedUser.lastname = lastname
    if(age) updatedUser.age = age
    
    res.send(`user is updated of id ${id} in database`);
 }