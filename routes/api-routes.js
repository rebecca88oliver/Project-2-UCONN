// Dependencies
// =============================================================
const db = require("../models");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "jgf3z1e4t8t019g4",
  "wangi653tuug5ye8",
  "mud486bhder54swo",
  {
    dialect: "mysql"
  }
);
const queryInterface = sequelize.getQueryInterface();

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", (req, res) => {
    sequelize.query("SELECT * FROM Items;").then(results => {
      res.json(results[0]);
    });
  });

  app.get("/api/cat", (req, res) => {
    sequelize
      .query(
        "select *from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='items';"
      )
      .then(results => {
        const columns = [];
        results[0].forEach(element => columns.push(element.COLUMN_NAME));
        res.json(columns);
      });
  });

  // Search for Specific item (or all items) then provides JSON
  app.get("/api/:item", (req, res) => {
    console.log(req.params.item);
    sequelize
      .query("SELECT * FROM Items WHERE id= (:id);", {
        replacements: { id: req.params.item },
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        res.json(results);
      });
  });

  // Add a item
  app.post("/api/new", (req, res) => {
    console.log("Item Data:");
    console.log(req.body);
    db.Item.create(req.body).then(results => {
      if (Object.keys(req.body).length > 4) {
        for (let i = 4; i < Object.keys(req.body).length; i++) {
          sequelize.query(
            "UPDATE Items SET " + Object.keys(req.body)[i] + "=? WHERE Name=?;",
            {
              replacements: [Object.values(req.body)[i], req.body.Name]
            }
          );
        }
      } else {
        res.json(results);
      }
    });
  });

  app.put("/api/edit", (req, res) => {
    console.log("item Data:");
    console.log(req.body);
    db.Item.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    if (Object.keys(req.body).length > 4) {
      for (let i = 7; i < Object.keys(req.body).length; i++) {
        sequelize.query(
          "UPDATE Items SET " + Object.keys(req.body)[i] + "=? WHERE Name=?;",
          {
            replacements: [Object.values(req.body)[i], req.body.Name]
          }
        );
      }
    } else {
      res.json(results);
    }
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
    console.log(Object.keys(req.body)[0]);

    queryInterface.addColumn("items", Object.keys(req.body)[0], {
      type: DataTypes.STRING
    });
  });

  app.post("/api/delCat", (req, res) => {
    console.log("Deleted Category:");
    console.log(Object.keys(req.body)[0]);

    queryInterface.removeColumn("items", Object.keys(req.body)[0]);
  });

  app.post("/api/editCat", (req, res) => {
    console.log("Category:");
    console.log(req.body);

    queryInterface.renameColumn(
      "items",
      req.body.oldCategory,
      req.body.newCategory
    );
  });
};
