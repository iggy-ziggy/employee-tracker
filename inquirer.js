const inquirer = require('inquirer');

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
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });