//import employee class as a parent class
const Employee = require('./Employee')

//use extends method to create a sub-class


class Manager extends Employee{
    constructor(name,id,email,officeNum){
        super(name,id,email)
        this.officeNum = officeNum;

    };
    getOfficeNum(){
        return this.officeNum
    };
    getRole(){
        return "Manager"
    };

}

module.exports = Manager