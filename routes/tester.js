// Our router module
const router = require('express').Router();

// Our controller
const TestersController = require('../controllers/testersController');

// Our routes
router.get(`/new`, TestersController.new);
router.post('/', TestersController.create);

// We have to export our changes
module.exports = router;