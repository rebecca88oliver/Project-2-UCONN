var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");



module.exports = (sequelize, DataTypes) => {
    const Item = Sequelize.define("Item", {
    itemName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true 
    },
    baseCost: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    retailPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    itemQuantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    itemDescription: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    needsRestock: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    retailProfit: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

return Item;
};
