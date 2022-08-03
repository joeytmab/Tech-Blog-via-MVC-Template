//router needed as middleware; allows modular route handlers
const router = require('express').Router();

//setup of routes
//note, home routes do not need /api prefix.
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;