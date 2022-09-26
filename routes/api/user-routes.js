const router = require("express").Router();
const userController = require('../../controllers/user-controller.js');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);

module.exports = router;


