//import employee class as a parent class
const Employee = require('./Employee')

//use extends method to create a sub-class


class Intern extends Employee{
    constructor(name,id,email,school){
        super(name,id,email)
        this.school = school;

    };
    getSchool(){
        return this.school
    };
    getRole(){
        return "Intern"
    };

}

module.exports = Intern