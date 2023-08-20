const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    age:{type:String,required:true},
    salary:{type:String}
});

module.exports = mongoose.model('Employee',employeeSchema);