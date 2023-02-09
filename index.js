// packages needed
var inquirer = require('inquirer');
const fs = require('fs');
//import the classes
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');

//create an array of questions to prompt the user

// Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "mngrName",
        message: "Who is your team manager?"
      },
      {
        type: "input",
        name: "empID",
        message: "Please enter your employee ID",

      },      {
        type: "input",
        name: "email",
        message: "What is your email address?"
      },
      {
        type: "input",
        name: "officeNum",
        message: "Enter your office number"
      },
//question for adding engineer, intern, or finish
      {
        type: "list",
        name: "addMember",
        message: "Would you like to add a team member?",
        choices:[ "Add an Engineer", "Add an Intern", "Finish building my team"]
      }

];

//array of questions to prompt when you add an engineer
  const questionsEng = [
    {
      type: "input",
      name: "engName",
      message: "Name of Engineer"
    },
    {
      type: "input",
      name: "engEmpID",
      message: "Please enter the employee ID of the Engineer",

    },      {
      type: "input",
      name: "engEmail",
      message: "What is the Engineer's email address?"
    },
    {
      type: "input",
      name: "gitHub",
      message: "Enter the engineer's gitHub username?"
    },
  ]
//array of questions to prompt when you add an intern
const questionsIntern = [
  {
    type: "input",
    name: "internName",
    message: "Name of Intern"
  },
  {
    type: "input",
    name: "internEmpID",
    message: "Please enter the employee ID of the Intern",

  },      {
    type: "input",
    name: "internEmail",
    message: "What is the Intern's email address?"
  },
  {
    type: "input",
    name: "internSchool",
    message: "What school does the intern attend?"
  },
]

// create a function to write an HTML file
function writeToFile(tempelate) { 
  
  fs.writeFile("dist/team.html",  tempelate,(error) => {
   if(error){
       throw error
   }
console.log("Your file was created successfully in the dist folder")
  })
};

// define the functions needed to generate HTML with the answers
// render cards functions   
function renderEngCard(team) {
  let html = "";
  team.forEach((member) => {
    if (member instanceof Engineer) {
      html += `
      <div class="card">
        <h1>${member.name} </h1>
        <h2>  Engineer <h2>
        <ul> 
            <li> Employee ID: ${member.id} </li>
            <li> Email: ${member.email} </li>
            <li> GitHub Username: ${member.github} </li>
        </ul>
      </div>
      `;
    }
  });
  return html;
}

function renderInternCard(team) {
  let html = "";
  team.forEach((member) => {
    if (member instanceof Intern) {
      html += `
      <div class="card">
        <h1>${member.name} </h1>
        <h2>  Intern <h2>
        <ul>
          <li> Employee ID: ${member.id} </li>
          <li>  Email: ${member.email} </li>
          <li>  School: ${member.school} </li>
        </ul>
      </div>
      `;
    }
  });
  return html;
}



//main HTML
function generateHTML(team) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Team</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <nav> <h1>My Team</h1> </nav>
    <div class="card">
      <h1>${team[0].name} </h1>
        <h2>  Manager <h2>
        <ul> 
          <li>  Employee ID: ${team[0].id} </li>
          <li>  Email: ${team[0].email} </li>
          <li>  Office Number: ${team[0].officeNum} </li>
        </ul>
    </div>

    ${renderEngCard(team)}
    ${renderInternCard(team)}


  </body>
  </html>
  `;
}


// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      //create a new instance of the Manager class
      const manager = new Manager(answers.mngrName, answers.empID, answers.email, answers.officeNum);
      //create an array to store all the team members
      let team = [];
      team.push(manager)
      promptTeamMembers(team);
    });
}

function promptTeamMembers(team) {
  inquirer
    .prompt({
      type: "list",
      name: "addMember",
      message: "Would you like to add a team member?",
      choices: ["Add an Engineer", "Add an Intern", "Finish building my team"]
    })
    .then((answers) => {
      if (answers.addMember === "Add an Engineer") {
        inquirer.prompt(questionsEng).then((answers) => {
          //create a new instance of the Engineer class
          const engineer = new Engineer(
            answers.engName,
            answers.engEmpID,
            answers.engEmail,
            answers.github,
          );
          //push the new engineer to the team array
          team.push(engineer);
          promptTeamMembers(team);
        });
      } else if (answers.addMember === "Add an Intern") {
        inquirer.prompt(questionsIntern).then((answers) => {
          //create a new instance of the Intern class
          const intern = new Intern(
            answers.internName,
            answers.internEmpID,
            answers.internEmail,
            answers.internSchool
          );
          //push the new intern to the team array
          team.push(intern);
          promptTeamMembers(team);
        });
      } else {
        writeToFile(generateHTML(team));
      }
    });
}




//call the init function
init();
