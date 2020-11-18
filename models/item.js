// Dependencies
//////////////////////////////////////////////
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.

//Database code
//////////////////////////////////////////////
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    Name: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    Wholesale: DataTypes.INTEGER,
    Retail: DataTypes.INTEGER
  });

  return Item;
};
