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
db.query('SELECT id AS "Dept_ID", name as "Dept_Name" FROM departments', function(err, results) {
    console.log(results);
});
// roles query
db.query('SELECT id AS "Role_ID", title AS "Title", salary AS "Salary", department_id AS "Dept_ID" FROM roles', function(err, results) {
    console.log(results);
});
// employee query
db.query(`SELECT employees.id AS "Emp_ID", last_name AS "Last_Name", first_name AS "First_Name", roles.title AS "Role", departments.name AS "Dept", roles.salary AS "Salary", manager_id AS "Manager" FROM employees JOIN roles ON role_id=roles.id JOIN departments ON departments.id=department_id`, function(err, results) {
    console.log(results);
});



app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});