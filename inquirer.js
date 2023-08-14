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
    type: 'number',
    message: 'Please enter a salary for this role',
    name: 'role_salary',
    when(answers) {
      return answers.add_role != null;
    }
  },
  {
    type: 'input',
    message: 'Please enter a first name',
    name: 'first_name',
    when(answers) {
      return answers.options == 'Add an employee';
    },
  },
  {
    type: 'input',
    message: 'Please enter a last name',
    name: 'last_name',
    when(answers) {
      return answers.first_name != null;
    },
  },
  {
    type: 'number',
    message: 'Please enter a role id',
    name: 'role_id',
    when(answers) {
      return answers.last_name != null;
    },
  },
  {
    type: 'number',
    message: `Please enter this employee's manager (manager id)`,
    name: 'emp_manager',
    when(answers) {
      return answers.role_id != null;
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

// update employee role
    // select employee
    // update role



inquirer
  .prompt(questions)
  .then((answers) => {
    // console.log(answers.options);
    console.log(answers);
    
    // switch() {
    //   case :
    //     console.log();
    //     break;
    //   case :
    //     console.log();
    //     break;
    //   case :
    //     console.log();
    //     break;
    //   case :
    //     console.log();
    //     break;
    // }
  })
  .catch((error) => {
    if (error.isTtyError) {
      
    } else {
      
    }
  });