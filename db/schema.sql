    
    CREATE DATABASE employee_tracker_db;

    USE employee_tracker_db;

-- CREATE DEPARTMENT TABLE
    CREATE TABLE department
    (
        department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        department_name VARCHAR(30)
    );
-- CREATE ROLE TABLE
    CREATE TABLE role
    (
        role_id INT NOT NULL PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL,
        department_id INT NOT NULL,
        FOREIGN KEY (department_id) REFERENCES department(department_id)
    );
-- CREATE EMPLOYEE TABLE
    CREATE TABLE employee
    (
        employee_id INT NOT NULL PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INT NOT NULL,
        manager_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES role(role_id)
    );
