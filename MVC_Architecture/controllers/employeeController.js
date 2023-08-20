const data = {
    employee : require('../model/employee.json'),
    setEmployee : function(data){
        this.employee = data
    }
};

const getAllEmployee = (req,res)=>{
    res.json(data.employee);
}

const createNewEmployee = (req,res)=>{

   const newEmployee = {
    id:data.employee[data.employee.length-1].id +1 || 1,
    firstname :req.body.firstname,
    lastname  :req.body.lastname
   }

   if(!newEmployee.firstname || !newEmployee.lastname){
    return res.status(404).json({'message':'first and last name is required.'});
   }
   data.setEmployee([...data.employee,newEmployee]);
   res.status(200).json(data.employee);
}

const updateEmployee = (req,res)=>{
    const employee = data.employee.find(emp=> emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee Id ${req.body.id} not found`});
    }

    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;

    const filteredArray = data.employee.filter(emp=>emp.id!==parseInt(req.body.id));
    const unsortedArray = [...filteredArray,employee];
    data.setEmployee(unsortedArray.sort((a,b)=> a.id>b.id ? 1:a.id<b.id ? -1:0));
    res.json(data.employee);

}

const deleteEmployee = (req,res)=>{
    const employee = data.employee.find(emp=> emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee Id ${req.body.id} not found`});
    }

    const filteredArray = data.employee.filter(emp=>emp.id!==parseInt(req.body.id));
    data.setEmployee([...filteredArray]);
    res.json(data.employee);

}

const getEmployee = (req,res)=>{
    const employee = data.employee.find(emp=> emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({"message":`Employee Id ${req.params.id} not found`});
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