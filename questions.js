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
          'Update an employee role',
          'Exit'
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
      name: 'salary',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.add_role != null;
      }
    },
    {
      type: 'number',
      message: 'Please enter a departmet id for this role',
      name: 'role_id',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.salary != null;
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
      name: 'emp_role_id',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.last_name != null;
      },
    },
    {
      type: 'number',
      message: `Please enter this employee's manager (manager id)`,
      name: 'emp_manager',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.emp_role_id != null;
      },
    },
    {
      type: 'number',
      message: 'Please enter the id of the employee you would like to update',
      name: 'emp_id',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.options == 'Update an employee role';
      },
    },
    {
      type: 'number',
      message: 'What role id would you like to give to this employee?',
      name: 'update_role_id',
      validate: (answer) => {
        if (!Number.isInteger(answer)) {
          return 'Please enter a number';
        }
        return true;
      },
      when(answers) {
        return answers.emp_id != null;
      },
    },
  ];


  module.exports = questions;