'use strict';
var inquirer = require("inquirer");

///Main Menu
//////////////////////////////////////////////
var questions = [
  {
      message: "What would you like to do?",
      type: "list", 
      choices: [
        "Insert New Product",
        "view full inventory",
        "update price",
        "update item description",
        "QUIT"
      ],
      name: "choice"
    }];

//Add a New Item
//////////////////////////////////////////////
var newItem = [
    {
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
        message:
          "Enter the base cost/manufacturing cost of your product (to calcuate profit)."
      }
];

inquirer.prompt(newItem).then(res => {
    connection.query("SELECT * FROM items", (err, data) => {
        console.table(data);
        askQuestions();
});
});



//Console Log it/ Replace with export to html page.     
inquirer.prompt(questions).then(res => {
    connection.query(
      "INSERT INTO employee (productName, productInfo, retailPrice, baseCost) VALUES (?, ?, ?, ?)",
      [res.productName, res.productInfo, res.retailPrice, res.baseCost],
      err => {
        if (err) {
          throw err;
        }
        console.table("Successfully Inserted");
        askQuestions();
      }
    )}
);