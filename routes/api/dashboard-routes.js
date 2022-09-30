const router = require("express").Router();
const dashboardController = require('../../controllers/dashboard-controller.js');

router.post('/createPost', dashboardController.createNewPost);

module.exports = router;
