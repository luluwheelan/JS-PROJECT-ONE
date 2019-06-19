const router = require('express').Router();

const BeersController = require('../controllers/beersController');

//Begin routers
router.get('/', BeersController.index);
router.get('/new', BeersController.new);
router.get('/:id', BeersController.show); //show single beer
router.get('/:id/edit', BeersController.edit);
router.get('/archive', BeersController.archive);//only show longin tester's records
router.post('/', BeersController.create);
router.post('/update', BeersController.update);
router.post('/destroy', BeersController.destroy);

//End routers

module.exports = router;