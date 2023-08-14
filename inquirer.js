const inquirer = require('inquirer');
const {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee} = require('./query');
const questions = require('./questions');


function menu () {
  inquirer
  .prompt(questions)
  .then((answers) => {
    // console.log(answers);
  
    switch(answers.options) {
      case 'View all departments':
          console.log('Viewing all departments:');
          viewDepartments(answers);
          break;
      case 'View all roles':
          console.log('Viewing all roles:');
          viewRoles(answers);
          break;
      case 'View all employees':
          console.log('Viewing all employees:');
          viewEmployees(answers);
          break;
      case 'Add a department':
          addDepartment(answers);
          break;
      case 'Add a role':
          addRole(answers);
          break;
      case 'Add an employee':
          addEmployee(answers);
          break;
      case 'Update an employee role':
          updateEmployee(answers);
          break;
      case 'Exit':
          console.log('Goodbye!');
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('There is an isTtyError')
    } else {
      console.log('There was some other error')
    }
  });
};

menu();