
// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM items";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  module.exports = function(app) {
    // Search for Specific item (or all items) then provides JSON
    app.get("/api/:items?", function(req, res) {
      if (req.params.items) {
        // Display the JSON for ONLY that item.
        // (Note how we're using the ORM here to run our searches)
        item.findOne({
          where: {
            routeName: req.params.items
          }
        }).then(function(result) {
          return res.json(result);
        });
      } else {
        item.findAll().then(function(result) {
          return res.json(result);
        });
      }
    });
  



  // Add a item
  app.post("/api/new", function(req, res) {
    console.log("item Data:");
    console.log(req.body);

    var dbQuery = "INSERT INTO items (itemName, baseCost, retailPrice, itemQuantity, itemDescription, needsRestock, retailProfit) VALUES (?,?,?,?,?,?,?)";

    connection.query(dbQuery, [req.body.author, req.body.body, req.body.created_at], function(err, result) {
      if (err) throw err;
      console.log("item was entered into database!");
      res.end();
    });
  });
};
