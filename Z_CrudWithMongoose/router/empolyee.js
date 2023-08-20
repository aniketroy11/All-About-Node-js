const express = require('express');
const router = express.Router();
const employeeController = require('../controller/empolyees');

router.route('/')
    .get(employeeController.GetEmployees)
    .post(employeeController.CreateEmployee)
    .put(employeeController.UpdateEmployee)
    .delete(employeeController.DeleteEmployee)

router.route('/:id')
    .get(employeeController.GetEmployeeById)


module.exports = router;