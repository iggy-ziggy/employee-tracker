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
const viewDepartments = () => {
    db.query('SELECT id AS "Dept_ID", name as "Dept_Name" FROM departments', function(err, results) {
        console.log(results);
    });
};


// view all roles
const viewRoles = () => {
    db.query('SELECT roles.id AS "Role_ID", title AS "Title", salary AS "Salary", departments.name AS "Department" FROM roles JOIN departments ON departments.id=department_id', function(err, results) {
        console.log(results);
    });
};


// view all employees
const viewEmployees = () => {
    db.query(`SELECT employees.id AS "Emp_ID", employees.last_name AS "Last_Name", employees.first_name AS "First_Name", roles.title AS "Role", departments.name AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN employees manager on manager.id = employees.manager_id JOIN roles ON employees.role_id=roles.id JOIN departments ON departments.id=department_id`, function(err, results) {
        console.log(results);
    });
};


// add new department
// use `?` instead of `Books` then pass user input as param
const addDepartment = () => {
    db.query(`INSERT INTO departments (name) VALUES ('Books')`, function(err, results) {
        console.log(results);
    });
};


// add new role
const addRole = () => {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('Bookseller', 40000, 1)`, function(err, results) {
        console.log('Role added!');
    });
};


// add new employee
const addEmployee = () => {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Maynard', 'Keenan', 2, 5)`, function(err, results) {
        console.log('Employee added!');
    });
};


// update employee role
const updateEmployee = () => {
    db.query(`UPDATE employees SET role_id = 3 WHERE employees.id = 3`, function(err, results) {
        console.log('Employee role updated!');
    });
};

// viewDepartments();

module.exports = {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee};