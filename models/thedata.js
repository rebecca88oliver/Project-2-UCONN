const Sequelize = require("sequelize");
const { all } = require("sequelize/types/lib/operators");

module.exports = sequelize.define("Item", {
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

