const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    console.log(err);
  };

  try {
    await Post.bulkCreate(postData);
  } catch (err) {
    console.log(err);
  };
  
  try {
    await Comment.bulkCreate(commentData);
  } catch (err) {
    console.log(err);
  };

  process.exit(0);
};

seedDatabase();