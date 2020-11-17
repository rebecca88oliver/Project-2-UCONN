// Dependencies
// =============================================================
const db = require("../models");
const { Sequelize } = require("../models/index.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", (req, res) => {
    db.Item.findAll({}).then(results => {
      res.json(results);
    });
  });

  app.get("/api/cat", (req, res) => {
    res.json(Object.keys(db.Item.rawAttributes));
  });

  // Search for Specific item (or all items) then provides JSON
  app.get("/api/:item", (req, res) => {
    db.Item.findAll({
      where: {
        itemName: req.params.itemName
      }
    }).then(results => {
      res.json(results);
    });
  });

  // Add a item
  app.post("/api/new", (req, res) => {
    console.log("Item Data:");
    console.log(req.body);
    db.Item.create(req.body).then(results => {
      res.json(results);
    });
  });

  app.post("/api/edit", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    db.Item.update(req.body[1], {
      where: {
        id: req.body[0].id
      }
    });
  });

  app.post("/api/delete", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    db.Item.destroy({
      where: {
        id: req.body.id
      }
    });
  });

  app.post("/api/newCat", (req, res) => {
    console.log("New Category:");
    console.log(req.body);

    db.Item.addColumn("items", req.body, Sequelize.VARCHAR);
  });

  app.post("/api/delCat", (req, res) => {
    console.log("Deleted Category:");
    console.log(req.body);

    db.Item.removeColumn("items", req.body);
  });
  app.post("/api/editCat", (req, res) => {
    console.log("Category:");
    console.log(req.body);

    db.Item.renameColumn("items", req.body[0], req.body[1]);
  });
};
