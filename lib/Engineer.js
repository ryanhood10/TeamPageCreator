//import employee class as a parent class
const Employee = require('./Employee')

//use extends method to create a sub-class


class Engineer extends Employee{
    constructor(name,id,email,github){
        super(name,id,email)
        this.github = github;

    };
    getGithub(){
        return this.github
    };
    getRole(){
        return "Engineer"
    };

}

module.exports = Engineer