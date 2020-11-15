
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render('dashboard')
  });

  app.get("/createInventory", (req, res) => {
    res.render('createInventory')
  });

  app.get("/addCategory", (req, res) => {
    res.render('addCategory')
  });

  app.get("/editCategory", (req, res) => {
    res.render('editCategory')
  });

  app.get("/deleteCategory", (req, res) => {
    res.render('deleteCategory')
  });

 
  app.get("/changeCategoryOrder", (req, res) => {
    res.render('changeCategoryOrder')
  });

  app.get("/createProduct", (req, res) => {
    res.render('createProduct')
  });

  app.get("/fullInventory", (req, res) => {
    res.render('fullInventory')
  });

  app.get("/productList", (req, res) => {
    res.render('productList')
  });
  
};
