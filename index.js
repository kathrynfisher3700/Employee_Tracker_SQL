const inquirer = require('inquirer');
const mysql = require('mysql2');
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
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the courses_db database.`)
);
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {

  });

//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              VARIABLE, FIRST Q          //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//

//Sets first prompt question into a variable. This makes it easier to prompt the next questions or retrieve data based on the answer given.
const firstQuestion = [
    {
        type: 'list',
        message: 'Please choose an action.',
        choices: ['View All Departments','View All Roles','View All Employees','Add a Department',"Add a Role",'Add an Employee','Update an Employee Role','Total Utilized Budget'],
        name: 'action'
    },
]

//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//
//              FUNCTION TO BEGIN QUESTIONS         //
//X+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+XX+X+X+X+X//

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
        case 'Total Utilized Budget':      //BONUS!!
            deptBudget();
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
    menu();
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
        menu();
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
        menu();
    })

}

//ADDING INFORMATION TO DB

//ADD Department
async function addDeptFunc(){
   inquirer.prompt([
    {
        type: 'input',
        message: 'Which department would you like to add?',
        name: 'newDepartment'
    }
   ])
    .then((response) => {
        const {newDepartment} = response
    const query = `
    INSERT INTO department (department_name)
    VALUES ('${newDepartment}');
    `;
    db.query(query, function(err, results){
        if(err){console.log("Error, cannot add department to database"  +err);
    return;
    }
        console.log("Department added to database!");
        viewAllDepartments();
        menu();
    })
})
}

//ADD Role
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
            message: 'Enter the department ID of the new role:',
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
        menu();
    })
})

}

//ADD Employee
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
            message: 'Enter the role ID of the new employee:',
            name: 'newEmpRole'
        },
        {
            type: 'input',
            message: 'Enter the manager ID for the new employee:',
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
        menu();
    })
    })
}

//UPDATE Employee
function updateEmployeeFunc(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee first name to update their role.',
            name: 'empSelect'
        },
        {
            type: 'input',
            message: 'Please select their new role ID',
            name: 'upEmpRole'
        }
    ])
    .then((response) => {
        const { empSelect, upEmpRole } = response
    const query = `
    UPDATE employee
    SET role_id = '${upEmpRole}'
    WHERE first_name = '${empSelect}'
    `;
    db.query(query, function(err, results){
        if(err){console.log(err);
    return;
    }
        console.log("Employee updated!");
        menu();
    })
    })
}

//VIEW Budget BONUS
function deptBudget() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department ID for total budget',
            name: 'budget'
        },
    ])
    .then((response) => {
        const { budget } = response
    const query = `
    SELECT SUM(salary)
    FROM role
    WHERE department_id = "${budget}";
    `;
    db.query(query, function(err, results){
        if(err){console.log(err);
    return;
    }
        console.table(results);
        menu();
    })
    })
}


const init = () =>{
   menu();
};


init();