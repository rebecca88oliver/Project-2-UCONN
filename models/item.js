// Dependencies
//////////////////////////////////////////////
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.

//Database code
//////////////////////////////////////////////
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    itemName: {
      type: sequelize.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    baseCost: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    retailPrice: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    itemQuantity: {
      type: sequelize.INTEGER,
      allowNull: true
    },
    itemDescription: {
      type: sequelize.STRING(500),
      allowNull: true
    },
    needsRestock: {
      type: sequelize.BOOLEAN,
      default: false
    },
    retailProfit: {
      type: sequelize.INTEGER,
      allowNull: false
    }
  });

  return Item;
};
