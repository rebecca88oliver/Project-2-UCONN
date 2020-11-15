// Dependencies
// =============================================================
const connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", (req, res) => {
    const dbQuery = "SELECT * FROM items";

    connection.query(dbQuery, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });

  // Search for Specific item (or all items) then provides JSON
  app.get("/api/:items?", (req, res) => {
    if (req.params.items) {
      // Display the JSON for ONLY that item.
      // (Note how we're using the ORM here to run our searches)
      item
        .findOne({
          where: {
            routeName: req.params.items
          }
        })
        .then(result => {
          return res.json(result);
        });
    } else {
      items.findAll().then(result => {
        return res.json(result);
      });
    }
  });

  // Add a item
  app.post("/api/new", (req, res) => {
    console.log("item Data:");
    console.log(req.body);

    const dbQuery =
      "INSERT INTO items (itemName, baseCost, retailPrice, itemQuantity, itemDescription, needsRestock, retailProfit) VALUES (?,?,?,?,?,?,?);";

    connection.query(
      dbQuery,
      [req.body.author, req.body.body, req.body.created_at],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log("item was entered into database!");
        res.end();
      }
    );
  });

  app.post("/api/edit", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    item.update(req.body[1], {
      where: {
        id: req.body[0].id
      }
    });
  });

  app.post("/api/newCat", (req, res) => {
    console.log("New Category:");
    console.log(req.body);

    const dbQuery = "ALTER TABLE items ADD COLUMN ? VARCHAR(15);";

    connection.query(dbQuery, req.body, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Category was entered into database!");
      res.end();
    });
  });

  app.post("/api/delCat", (req, res) => {
    console.log("Deleted Category:");
    console.log(req.body);

    const dbQuery = "ALTER TABLE items DROP COLUMN ?;";

    connection.query(dbQuery, req.body, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Category was deleted from database!");
      res.end();
    });
  });
};
