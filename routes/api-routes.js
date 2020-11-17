// Dependencies
// =============================================================
const connection = require("../config/connection.js");
const { Sequelize } = require("../models/index.js");
const items = require("../models/thedata.js");

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
  app.get("/api/:item", (req, res) => {
    items
      .findAll({
        where: {
          itemName: req.params.item
        }
      })
      .then(results => {
        res.json(results);
      });
  });

  // Add a item
  app.post("/api/new", (req, res) => {
    console.log("Item Data:");
    console.log(req.body);
    items.create(req.body).then(results => {
      res.json(results);
    });
  });

  app.post("/api/edit", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    items.update(req.body[1], {
      where: {
        id: req.body[0].id
      }
    });
  });

  app.post("/api/delete", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    items.destroy({
      where: {
        id: req.body[0].id
      }
    });
  });

  app.post("/api/newCat", (req, res) => {
    console.log("New Category:");
    console.log(req.body);

    items.addColumn("items", req.body, Sequelize.VARCHAR);
  });

  app.post("/api/delCat", (req, res) => {
    console.log("Deleted Category:");
    console.log(req.body);

    items.removeColumn("items", req.body);
  });
};
