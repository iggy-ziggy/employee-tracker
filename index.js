const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// view all departments

const viewDepartments = (answers) => {
    db.query('SELECT id AS "Dept_ID", name as "Dept_Name" FROM departments', function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
};

// view all roles

const viewRoles = (answers) => {
    db.query('SELECT roles.id AS "Role_ID", title AS "Title", salary AS "Salary", departments.name AS "Department" FROM roles JOIN departments ON departments.id=department_id', function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
};

// view all employees

const viewEmployees = (answers) => {
    db.query(`SELECT employees.id AS "Emp_ID", employees.last_name AS "Last_Name", employees.first_name AS "First_Name", roles.title AS "Role", departments.name AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN employees manager on manager.id = employees.manager_id JOIN roles ON employees.role_id=roles.id JOIN departments ON departments.id=department_id`, function (err, results) {
        if (err) throw err;
        console.log(results);
        menu();
    });
};

// add new department

const addDepartment = (answers) => {
    db.query(`INSERT INTO departments (name) VALUES (?)`, answers.add_dept, function (err, results) {
        if (err) throw err
        console.log(results);
        console.log(`${answers.add_dept} has been added!`);
        menu();
    });
};

// add new role

const addRole = (answers) => {
    db.query(
        `INSERT INTO roles SET ?`, {
            title: answers.add_role,
            salary: answers.salary,
            department_id: answers.role_id
        },
        function (err, results) {
            if (err) throw err;
            console.log(results);
            console.log(`${answers.add_role} has been added!`);
            menu();
        });
};

// add new employee

const addEmployee = (answers) => {
    db.query(
        `INSERT INTO employees SET ?`, {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.emp_role_id,
            manager_id: answers.manager
        },
        function (err, results) {
            if (err) throw err;
            console.log(results);
            console.log(`${answers.first_name} ${answers.last_name} has been added!`);
            menu();
        });     
};

// update employee role

const updateEmployee = (answers) => {  
    const {emp_id, update_role_id} = answers;
    let params = [update_role_id, emp_id];
    db.query(`UPDATE employees SET role_id = ? WHERE employees.id = ?`, params, function (err, results) {
        if (err) throw err;
        console.log(results);
        console.log(`Employee has been updated!`);
        menu();
    });  
};

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