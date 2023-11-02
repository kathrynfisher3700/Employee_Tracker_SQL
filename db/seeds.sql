INSERT INTO department (department_id, department_name)
VALUES  (1, 'Sales'),
        (2, 'Marketing'),
        (3, 'Accounting'),
        (4, 'HR');

INSERT INTO role (role_id, title, salary, department_id)
VALUES  (1, 'Sales Agent', 80000, 1),
        (2, 'Graphic Artist', 50000, 2),
        (3, 'Admin', 60000, 3),
        (4, 'Hiring Coordinator', 40000, 4);


INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES  (35, 'Theodore', 'Maxwell', 1, 8),
        (36, 'Althea', 'Jacobs', 2, 9),
        (37, 'Amira', 'Fisher', 1, 8),
        (38, 'Jax', 'Minesfield', 4, 7),
        (39, 'Andrew', 'Hythen', 3, 6),
        (40, 'Mackenna', 'Marx', 3, 6);