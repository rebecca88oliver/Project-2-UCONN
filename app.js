// Import the sequelize object on which
// we have defined model.
const sequelize = require("./utils/database");

// Create all the table defined using
// sequelize in Database

// Sync all models that are not
// already in the database
sequelize.sync();

// Force sync all models
// It will drop the table first
// and re-create it afterwards
sequelize.sync({ force: true });
