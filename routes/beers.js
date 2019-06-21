const router = require('express').Router();

const BeersController = require('../controllers/beersController');

//Begin routers
router.get('/', BeersController.index);
router.get('/myBeer', BeersController.myBeer);//only show longin tester's records
router.get('/new', BeersController.new);
router.get('/type/:type', BeersController.type);
router.get('/style/:style', BeersController.style);
router.get('/:id', BeersController.show); //show single beer
router.get('/:id/edit', BeersController.edit);

router.post('/', BeersController.create);
router.post('/update', BeersController.update);
router.post('/destroy', BeersController.destroy);

//End routers

module.exports = router;