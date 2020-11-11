// Include Sequelize module. 
const Sequelize = require('sequelize') 

// Import sequelize object, 
// Database connection pool managed by Sequelize. 
const sequelize = require('../utils/database') 

// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const User = sequelize.define('user', { 

	// Column-1, user_id is an object with 
	// properties like type, keys, 
	// validation of column. 
	user_id:{ 

		// Sequelize module has INTEGER Data_Type. 
		type:Sequelize.INTEGER, 

		// To increment user_id automatically. 
		autoIncrement:true, 

		// user_id can not be null. 
		allowNull:false, 

		// For uniquely identify user. 
		primaryKey:true
	}, 

	// Column-2, name 
	name: { type: Sequelize.STRING, allowNull:false }, 

	// Column-3, email 
	email: { type: Sequelize.STRING, allowNull:false }, 

	// Column-4, default values for 
	// dates => current time 
	myDate: { type: Sequelize.DATE, 
			defaultValue: Sequelize.NOW }, 

	// Timestamps 
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}) 

// Exporting User, using this constant 
// we can perform CRUD operations on 
// 'user' table. 
module.exports = User









// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
//const bcrypt = require("bcryptjs");
// Creating our User model
//module.exports = function (sequelize, DataTypes) {
//  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
//    email: {
//      type: DataTypes.STRING,
//      allowNull: false,
//      unique: true,
//      validate: {
//        isEmail: true
//      }
//    },
    // The password cannot be null
//    password: {
//      type: DataTypes.STRING,
//      allowNull: false
//    }
//  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
//  User.prototype.validPassword = function (password) {
//    return bcrypt.compareSync(password, this.password);
//  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
//  User.addHook("beforeCreate", user => {
//    user.password = bcrypt.hashSync(
//      user.password,
//      bcrypt.genSaltSync(10),
//      null
//    );
//  });
//  return User;
//};
