INSERT INTO departments (name)
VALUES  ("Customer Service"),
        ("Receiving"),
        ("Cafe");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Information Desk", 40000.00, 1),
        ("Inventory Specialist", 40000.00, 2),
        ("Barista", 40000.00, 3),
        ("Sales Manager", 60000.00, 1),
        ("Warehouse Manager", 60000.00, 2),
        ("Cafe Manager", 60000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Jane", "Doe", 1, null),
        ("Johnny", "Truant", 2, null),
        ("Marla", "Singer", 3, null),
        ("David", "Jones", 4, null),
        ("Tori", "Amos", 5, null),
        ("Sarah", "Neufeld", 6, null);

UPDATE employees
SET 
    manager_id = CASE
        WHEN role_id = 1    THEN 4
        WHEN role_id = 2    THEN 5
        WHEN role_id = 3    THEN 6
    END;




