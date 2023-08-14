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
        // menu();
    });
};

// view all roles

const viewRoles = (answers) => {
    db.query('SELECT roles.id AS "Role_ID", title AS "Title", salary AS "Salary", departments.name AS "Department" FROM roles JOIN departments ON departments.id=department_id', function (err, results) {
        if (err) throw err;
        console.log(results);
        // menu();
    });
};

// view all employees

const viewEmployees = (answers) => {
    db.query(`SELECT employees.id AS "Emp_ID", employees.last_name AS "Last_Name", employees.first_name AS "First_Name", roles.title AS "Role", departments.name AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN employees manager on manager.id = employees.manager_id JOIN roles ON employees.role_id=roles.id JOIN departments ON departments.id=department_id`, function (err, results) {
        if (err) throw err;
        console.log(results);
        // menu();
    });
};

// add new department

const addDepartment = (answers) => {
    db.query(`INSERT INTO departments (name) VALUES (?)`, answers.add_dept, function (err, results) {
        if (err) throw err
        console.log(results);
        console.log(`${answers.add_dept} has been added!`);
        // menu();
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
            // menu();
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
            // menu();
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
        // menu();
    });  
};



module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee };