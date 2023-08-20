const Employee = require('../model/Employee');

const getAllEmployee = async(req,res)=>{
    const employees =await Employee.find();
    if(!employees) return res.status(204).json({'Message':`No employees found`});
    res.json(employees);

}

const createNewEmployee =async (req,res)=>{

   if(!req?.body?.firstname || !req?.body?.lastname ){
    return res.status(400).json({'message':'Both firstname and lastname required'});
   }
   try {
        const result = await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname
        });
        res.status(201).json(result);
   } catch (error) {
        console.log(error);
   }
}

const updateEmployee = async(req,res)=>{
    if(!req?.body.id){
        return res.status(400).json({'message':'Id parameter is required'});
    }

    const employee = await Employee.findOne({_id:req.body.id});

    if(!employee){
        return res.status(400).json({'message':`No employees matches ${req.body.id}`});
    }

    if(req.body?.firstname) employee.firstname = req.body.firstname;
    if(req.body?.lastname) employee.lastname = req.body.lastname;

    const result = await employee.save();
    console.log(result)
    res.json(result);

}

const deleteEmployee = async(req,res)=>{
    if(!req?.body.id){
        return res.status(400).json({'message':'employee id required'});
    }
    const employee = await Employee.findOne({_id:req.body.id});
    if(!employee){
        return res.status(400).json({'message':`No employees matches ${req.body.id}`});
    }
   
    const result = employee.deleteOne({_id:req.body.id});
    console.log("Deleted");
    res.json(result);

}

const getEmployee = async(req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({'message':'Employee id required'});
    }
    const employee = await Employee.findOne({_id:req.params.id});
    if(!employee){
        return res.status(400).json({'message':`No employees matches ${req.params.id}`});
    }
    res.json(employee);

}

module.exports = {
    getAllEmployee,
    getEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}