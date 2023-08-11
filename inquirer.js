const inquirer = require('inquirer');

const questions = [
  {
    type:'list',
    message: 'What would you like to do?',
    name: 'options',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
    ]
  },
  {
    type: 'input',
    message: 'Please enter a department to add to the database',
    name: 'add_dept',
    when(answers) {
        return answers.options == 'Add a department';
    },
  },
  {
    type: 'input',
    message: 'Please enter a role to add to the database',
    name: 'add_role',
    when(answers) {
      return answers.options == 'Add a role';
    },
  },
  {
    type: 'input',
    message: 'Please enter an employee to add to the database',
    name: 'add_emp',
    when(answers) {
      return answers.options == 'Add an employee';
    },
  },
  {
    type: 'input',
    message: 'Please enter the employee you would like to update',
    name: 'update_emp',
    when(answers) {
      return answers.options == 'Update an employee role';
    },
  },
];
// what would you like to do?
// view all departments
    //return table with dep name and id -- CHECK
//view all roles
    // table with job title, role id, dep, salary -- CHECK
// view all employees
    // table with em id, names, job title, dep, salary, and manager -- CHECK
// add dep
    // enter dep name -- CHECK
// add role
    // role name, salary, dep --CHECK
// add employee
    // first, last, role, manager -- CHECK
// update employee role
    // select employee
    // update role



inquirer
  .prompt(questions)
  .then((answers) => {
    // Use user feedback for... whatever!!
    // console.log(answers.options);
    // console.log(answers);
    
    switch() {
      case :
        console.log();
        break;
      case :
        console.log();
        break;
      case :
        console.log();
        break;
      case :
        console.log();
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });