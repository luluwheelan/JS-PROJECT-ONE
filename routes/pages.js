const router = require(`express`).Router();

//Our controllers
const PageController = require('../controllers/pagesController');



//Create our routes
router.get('/', PageController.show);
router.get('/about', PageController.show);
router.get('/contact', PageController.show);


module.exports = router;
