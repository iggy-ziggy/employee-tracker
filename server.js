const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// departments query
// db.query('SELECT id AS "Dept_ID", name as "Dept_Name" FROM departments', function(err, results) {
//     console.log(results);
// });
// roles query
// db.query('SELECT id AS "Role_ID", title AS "Title", salary AS "Salary", department_id AS "Dept_ID" FROM roles', function(err, results) {
//     console.log(results);
// });

db.query('SELECT roles.id AS "Role_ID", title AS "Title", salary AS "Salary", departments.name AS "Department" FROM roles JOIN departments ON departments.id=department_id', function(err, results) {
    console.log(results);
});
// employee query
// db.query(`SELECT employees.id AS "Emp_ID", last_name AS "Last_Name", first_name AS "First_Name", roles.title AS "Role", departments.name AS "Department", roles.salary AS "Salary", manager_id AS "Manager" FROM employees JOIN roles ON role_id=roles.id JOIN departments ON departments.id=department_id`, function(err, results) {
//     console.log(results);
// });

// db.query(`SELECT employees.id AS "Emp_ID", employees.last_name AS "Last_Name", employees.first_name AS "First_Name", roles.title AS "Role", departments.name AS "Department", roles.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN employees manager on manager.id = employees.manager_id JOIN roles ON employees.role_id=roles.id JOIN departments ON departments.id=department_id`, function(err, results) {
//     console.log(results);
// });

db.query(`INSERT INTO departments (name) VALUES ('Books')`, function(err, results) {
    console.log(results);
});

db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('Bookseller', 40000, 1)`, function(err, results) {
    console.log('Role added!');
});

db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Maynard', 'Keenan', 2, 5)`, function(err, results) {
    console.log('Employee added!');
});

db.query(`UPDATE employees SET role_id = 3 WHERE employees.id = 3`)

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


// SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN employees manager on manager.id = employees.manager_id JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id ORDER BY employees.id;