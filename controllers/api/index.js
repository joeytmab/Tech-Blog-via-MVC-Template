const router = require('express').Router();

//setup of route files 
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const commentRoutes = require('./commentRoutes')

//setup of express router. connects router middleware to route files and routes
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comment', commentRoutes);

module.exports = router;