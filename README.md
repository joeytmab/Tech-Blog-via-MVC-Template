<h1 align="center">Tech-Blog via MVC Template</h1>

## Description

Tech Blog website, made possible by using MVC (Model-View-Controller) practices.

MVC frameworks allow for dynamic applications. By using models to create database architecture, viewing functions (via Handlebars.js) for data population, and controller routing (via APIs) for CRUD functionality, we are able to process and render user information seamlessly.

Technologies used include Sequelize ORM (for models), Express.js (for controller routes), and Handlebars.js (for view functions). `.dotenv` and `bcrypt` are also used as custom middlewares for user authentication, as an added layer of security for the user. Finally, MySQL is used for database initialization and for seeding user data, as well as any and all user inputs.

Below is a gif file showing functionality of the app, including login, viewing of other posts, commenting on posts, creation of new posts, and deletion. Included in the application (but not shown in the gif) are the ability to edit and update existing posts by the user.

![Functionality](./assets/techblogGIF.gif)

## Installation Parameters

`npm i` allows for necessary installation of miscellaneous packages. Doing so will install Express, Dotenv, Bcrypt, and Handlebars.js.

A MySQL Workbench is also used, but not required, for proper database function. `mysql -u root -p`, followed by `source db/schema.sql` will also ensure proper results.

Finally, `node seeds/seed.js` will be used to seed user, post, and comment data for visualization. `npm run start` can be used after to initialize the app.

Note: if running the application locally (instead of on the Heroku environment), `http://localhost:3001/` will be the target address for application access.

## Deployed Link

Please click [Here!](https://protected-shelf-89521.herokuapp.com/)

## Questions? Comments?

Contact me on Github or via email! </br>
Github: [github.com/joeytmab](github.com/joeytmab) </br>
Email: [joseph.t.binas@gmail.com](joseph.t.binas@gmail.com)
