// Dependencies
//////////////////////////////////////////////
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.

//Database code
//////////////////////////////////////////////
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemName: DataTypes.STRING,
    baseCost: DataTypes.INTEGER,
    retailPrice: DataTypes.INTEGER,
    itemQuantity: DataTypes.INTEGER
  });

  return Item;
};
