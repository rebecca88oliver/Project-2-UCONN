const mysql = require('mysql');
const inquirer = require("inquirer");




var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "p0w3r",
    database: "custom_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "Create new product",
            "view full inventory",
            "update price",
            "update item description",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "Create new item":
                newProduct()
                break;

            case "view full inventory":
                viewInventory()
                break;

            case "update price":
                updatePrice()
                break;

            case "update item description":
                updateDescription()
                break;

            default:
                connection.end()
                break;
        }
    })
}


function newProduct() {
    inquirer.prompt([{
            type: "input",
            name: "productName",
            message: "Enter Product Name"
        },
        {
            type: "input",
            name: "productInfo",
            message: "Enter a description of your product."
        },
        {
            type: "number",
            name: "retailPrice",
            message: "Enter the price of your product."
        },
        {
            type: "number",
            name: "baseCost",
            message: "Enter the base cost/manufacturing cost of your product (to calcuate profit)."
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (productName, productInfo, retailPrice, baseCost) VALUES (?, ?, ?, ?)', [res.productName, res.productInfo, res.retailPrice, res.baseCost], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}


function newProduct() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}



function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}