//entry point to Sequelize; dotenv required for .env file
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//jawsdb needed for Heroku database setup.
//.env allows layer of security here, particularly with the mysql password
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;