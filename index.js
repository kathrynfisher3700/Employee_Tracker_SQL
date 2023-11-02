const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const express = require('express');
// const db = require('./db');
// const sequelize = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'employee_tracker'
  },
  console.log(`Connected to the courses_db database.`)
);
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {

  });

//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              VARIABLES           //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//







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
// const addDepartment = [
//     {
//         type: 'input',
//         message: 'Which department would you like to add?',
//         name: 'newDepartment'
//     }

// ]

//Sets questions to be prompted when user wants to ADD A ROLE
// const addRole = [
//     {
//         type: 'input',
//         message: 'Enter the name of the new role:',
//         name: 'newRoleName'
//     },
//     {
//         type: 'input',
//         message: 'Enter the salary of the new role:',
//         name: 'newRoleSalary'
//     },
//     {
//         type: 'input',
//         message: 'Enter the department of the new role:',
//         name: 'newRoleDep'
//     }

// ]

//Sets questions to be prompted when user wants to ADD AN EMPLOYEE
// const addEmployee = [
//     {
//         type: 'input',
//         message: 'Enter the first name of the new employee:',
//         name: 'newEmpNameF'
//     },
//     {
//         type: 'input',
//         message: 'Enter the last name of the new employee:',
//         name: 'newEmpNameL'
//     },
//     {
//         type: 'input',
//         message: 'Enter the role of the new employee:',
//         name: 'newEmpRole'
//     },
//     {
//         type: 'input',
//         message: 'Enter the manager for the new employee:',
//         name: 'newEmpMang'
//     }

// ]

//Sets question to be prompted when user wants to UPDATE ROLE OF AN EMPLOYEE
// const updateEmployee = [
//     {
//         type: 'list',
//         message: 'Please select an employee to update their role.',
//         name: 'empSelect'
//     },
//     {
//         type: 'input',
//         message: 'Please select their new role',
//         name: 'upEmpRole'
//     }
// ]






function menu(){
    inquirer.prompt(firstQuestion)
    .then((response) => {
        switch(response.action) {
            case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees()
            break
        case 'Add a Department':
            addDeptFunc();
            break;
        case 'Add a Role':
            addRoleFunc();
            break;
        case 'Add an Employee':
            addEmployeeFunc();
            break;
        case 'Update an Employee Role':
            updateEmployeeFunc();
            break;
        }
    })
};


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

async function addDeptFunc(){
   inquirer.prompt([
    {
        type: 'input',
        message: 'Which department would you like to add?',
        name: 'newDepartment'
    }
   ])
    .then((response) => {
        const {action} = response
    const query = `
    INSERT INTO department (department_name)
    VALUES ('${action}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add department to database"  +err);
    return;
    }
        console.log("Department added to database!");
        viewAllDepartments();
    })
})
}

function addRoleFunc(){
    inquirer.prompt([
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
    ])
    .then((response) => {
        const {newRoleName, newRoleSalary, newRoleDep} = response
    const query = `
    INSERT INTO role (title, salary, department_id)
    VALUES ('${newRoleName}', '${newRoleSalary}', '${newRoleDep}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add role to database" +err);
    return;
    }
        console.log("Role added to database!");
        viewAllRoles();
    })
})

}

function addEmployeeFunc(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name of the new employee:',
            name: 'newEmpNameF'
        },
        {
            type: 'input',
            message: 'Enter the last name of the new employee:',
            name: 'newEmpNameL'
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
    ])
    .then((response) => {
        const {newEmpNameF, newEmpNameL, newEmpRole, newEmpMang} = response
    const query = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${newEmpNameF}', '${newEmpNameL}', '${newEmpRole}', '${newEmpMang}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add employee to database" +err);
    return;
    }
        console.log("Employee added to database!");
    })
    })
}

function updateEmployeeFunc(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Please select an employee to update their role.',
            name: 'empSelect'
        },
        {
            type: 'input',
            message: 'Please select their new role',
            name: 'upEmpRole'
        }
    ])
    .then((response) => {
        const {empSelect, upEmpRole} = response
    const query = `
    UPDATE employee
    SET role_id = '${upEmpRole}'
    WHERE first_name = '${empSelect}'
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot update employee" +err);
    return;
    }
        console.log("Employee added to database!");
    })
    })
}



//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              INQUIRER PROMPTS          //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//


// function init(){
//     inquirer.prompt(firstQuestion)
//     .then((response) => {
//         if(response.action === 'View All Departments') {
//             viewAllDepartments();
//         }
//         else if (response.action === 'View All Roles'){
//             viewAllRoles();
//         }
//         else if (response.action === 'View All Employees'){
//             viewAllEmployees()
//         }
//         else if (response.action === 'Add a Department'){
//             inquirer.prompt(addDepartment)
//             const {action} = response
//             addDeptFunc(action);
//         }
//         else if (response.action === 'Add a Role'){
//             inquirer.prompt(addRole)
//             const {newRoleName, newRoleSalary, newRoleDep} = response
//             addRoleFunc(newRoleName, newRoleSalary, newRoleDep);
//         }
//         else if (response.action === 'Add an Employee'){
//             inquirer.prompt(addEmployee)

//             const {newEmpNameF, newEmpNameL, newEmpRole, newEmpMang} = response
//             addEmployeeFunc(newEmpNameF, newEmpNameL, newEmpRole, newEmpMang);
//         }
//         else if (response.action === 'Update an Employee Role'){
//             inquirer.prompt(updateEmployee)
//             const {empSelect, upEmpRole} = response
//             updateEmployeeFunc(empSelect, upEmpRole);
//         }
//     })
// };







const init = () =>{
    inquirer.prompt(firstQuestion)
    .then(function (response) {
        menu(response)
    })
};




init();
