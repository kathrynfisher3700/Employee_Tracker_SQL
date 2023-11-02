    
    CREATE DATABASE employee_tracker_db;

    USE employee_tracker_db;

-- CREATE DEPARTMENT TABLE
    CREATE TABLE department
    (
        department_id INT PRIMARY KEY,
        department_name VARCHAR(30)
    );
-- CREATE ROLE TABLE
    CREATE TABLE role
    (
        role_id INT PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL,
        department_id INT
    );
-- CREATE EMPLOYEE TABLE
    CREATE TABLE employee
    (
        employee_id INT PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        role_id INT,
        manager_id INT
    );