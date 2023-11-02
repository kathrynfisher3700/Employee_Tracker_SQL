const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const db = require('./db');

//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              VARIABLES           //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//

//Sets first prompt question into a variable. This makes it easier to prompt the next questions or retrieve data based on the answer given.
const firstQuestion = [
    {
        type: 'list',
        message: 'Please choose an action.',
        choices: ['View All Departments','View All Roles','View All Employees','Add a Department',"Add a Role",'Add an Employee','Update an Employee Role'],
        name: 'action'
    },
]

//Sets question to be prompted when user wants to ADD A DEPARTMENT
const addDepartment = [
    {
        type: 'input',
        message: 'Which department would you like to add?',
        name: 'newDepartment'
    }

]

//Sets questions to be prompted when user wants to ADD A ROLE
const addRole = [
    {
        type: 'input',
        message: 'Enter the name of the new role:',
        name: 'newRoleName'
    },
    {
        type: 'input',
        message: 'Enter the salary of the new role:',
        name: 'newRoleSalary'
    },
    {
        type: 'input',
        message: 'Enter the department of the new role:',
        name: 'newRoleDep'
    }

]

//Sets questions to be prompted when user wants to ADD AN EMPLOYEE
const addEmployee = [
    {
        type: 'input',
        message: 'Enter the first name of the new employee:',
        name: 'newEmpName'
    },
    {
        type: 'input',
        message: 'Enter the last name of the new employee:',
        name: 'newRoleSalary'
    },
    {
        type: 'input',
        message: 'Enter the role of the new employee:',
        name: 'newEmpRole'
    },
    {
        type: 'input',
        message: 'Enter the manager for the new employee:',
        name: 'newEmpMang'
    }

]

//Sets question to be prompted when user wants to UPDATE ROLE OF AN EMPLOYEE
const updateEmployee = [
    {
        type: 'list',
        message: 'Please select an employee to update their role.',
        name: 'newEmpName'
    },
    {
        type: 'input',
        message: 'Please select their new role',
        name: 'newEmpRole'
    },
]



//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              FUNCTIONS          //  
//   'View All Departments','View All Roles',
//   'View All Employees','Add a Department',
//   "Add a Role",'Add an Employee','Update an Employee Role'
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//

//RETRIEVING TABLES FROM DB

function viewAllDepartments() {
    const query = `
    SELECT * FROM department;
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot grab department information" +err);
    return;
    }
        console.table(results);
    })
}

function viewAllRoles(){
    const query = `
    SELECT * FROM role;
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot grab role information" +err);
    return;
    }
        console.table(results);
    })

}

function viewAllEmployees(){
    const query = `
    SELECT * FROM employee;
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot grab employee information" +err);
    return;
    }
        console.table(results);
    })

}

//ADDING INFORMATION TO DB

function addDept(newDepartment){
    const query = `
    INSERT INTO department (department_name)
    VALUES ('${newDepartment}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add department to database"  +err);
    return;
    }
        console.log("Department added to database!");
    })

}

function addRole(a,b,c,d){
    const query = `
    INSERT INTO role (title, salary, department_id)
    VALUES ('${a}', '${b}', '${c}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add role to database" +err);
    return;
    }
        console.log("Role added to database!");
    })

}

function addEmployee(a,b,c,d){
    const query = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${a}', '${b}', '${c}', '${d}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add employee to database" +err);
    return;
    }
        console.log("Employee added to database!");
    })

}


//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              INQUIRER PROMPTS          //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//


// function init(){
//     inquirer.prompt(firstQuestion)
//     .then((response)) =>
//         if(response.action === '')
// }
