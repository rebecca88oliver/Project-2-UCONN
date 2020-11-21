// Dependencies
const Sequelize = require("sequelize");
const express = require("express");
const app = express();
const db = require("./models");
const exphbs = require("express-handlebars");

// Creating express app and configuring middleware needed for authentication
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// configure view template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("==> Listening on port %s.", PORT);
  });
});
