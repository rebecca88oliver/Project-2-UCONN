'use strict';
var inquirer = require("inquirer");
const item = require("./item");

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

//Exports the answers to the database.   
inquirer.prompt(questions).then(res => {
    connection.query(
      "INSERT INTO items (productName, productInfo, retailPrice, baseCost) VALUES (?, ?, ?, ?)",
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


//Deleting an Item from the Database
////////////////////////////////////////////////////

//promt to enter name for deletion
var whatDelete = [{
  type: "input",
  name: "whatDelete",
  message: "Please enter the exact name of the product you would like to delete"
}];

inquirer.prompt(whatDelete).then(
//Deletes the item
function (req,res) {    
  model.destroy({
      where: {
          itemName: req.params.itemName
      }
  })
//Reports success or failure
  .then(function (deletedRecord) {
      if(deletedRecord === 1){
          res.status(200).json({message:"Deleted successfully"});          
      }
      else
      {
          res.status(404).json({message:"record not found"})
      }
  })
  .catch(function (error){
      res.status(500).json(error);
  });
});



//Changing an item attribute
////////////////////////////////////////////////////
const objectToUpdate = {
  title: 'Hello World',
  description: 'Hello World'
  }
  
  models.Locale.update(objectToUpdate, { where: { id: 2}})