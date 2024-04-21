const Sequelize = require("sequelize");
require('dotenv').config();

const Connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'expensify.sqlite',
});

const db = {};
db.Sequelize  = Sequelize;
db.Connection = Connection;

db.user = require("../models/user.model")(Connection, Sequelize);
db.category = require("../models/category.model")(Connection, Sequelize)
db.transaction = require("./transaction.model")(Connection, Sequelize)

db.transaction.belongsTo(db.user, {
    foreignKey: { name:'user_id', allowNull: false },
    as: "user",
});
db.transaction.belongsTo(db.category, {
    foreignKey: { name:'category_id', allowNull: false },
    as: "category",
});


const catData = [
  { name: 'Food', icon: 'fas fa-utensils', color: '#FF6347' },
  { name: 'Transportation', icon: 'fas fa-bus', color: '#FFA500' },
  { name: 'Shopping', icon: 'fas fa-shopping-bag', color: '#FFD700' },
  { name: 'Utilities', icon: 'fas fa-bolt', color: '#4682B4' },
  { name: 'Rent', icon: 'fas fa-home', color: '#006400' },
  { name: 'Entertainment', icon: 'fas fa-film', color: '#8A2BE2' },
  { name: 'Healthcare', icon: 'fas fa-medkit', color: '#20B2AA' },
  { name: 'Education', icon: 'fas fa-graduation-cap', color: '#800000' },
  { name: 'Travel', icon: 'fas fa-plane', color: '#8B4513' },
  { name: 'Insurance', icon: 'fas fa-shield-alt', color: '#4682B4' },
  { name: 'Gifts', icon: 'fas fa-gift', color: '#9932CC' },
  { name: 'Savings', icon: 'fas fa-piggy-bank', color: '#32CD32' },
  { name: 'Investments', icon: 'fas fa-chart-line', color: '#FFD700' },
  { name: 'Groceries', icon: 'fas fa-shopping-basket', color: '#FFA500' },
  { name: 'Dining Out', icon: 'fas fa-utensil-spoon', color: '#FF6347' },
  { name: 'Personal Care', icon: 'fas fa-spa', color: '#20B2AA' },
  { name: 'Pets', icon: 'fas fa-paw', color: '#9932CC' },
  { name: 'Charity', icon: 'fas fa-hands-helping', color: '#32CD32' },
  { name: 'Home Improvement', icon: 'fas fa-tools', color: '#800000' },
  { name: 'Taxes', icon: 'fas fa-file-invoice-dollar', color: '#8B4513' },
  { name: 'Others', icon: 'fas fa-file-invoice-dollar', color: '#808080' }
];

db.Connection.sync().then(() => {
    return db.category.bulkCreate(catData);
}).then(() => {
    console.log("Categories inserted successfully");
}).catch(err => {
    console.error("Error inserting Categories:", err);
}); 


module.exports = db;