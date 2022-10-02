const router = require("express").Router();
const dashboardController = require('../../controllers/dashboard-controller.js');

router.post('/createPost', dashboardController.createNewPost);
router.post('/comment', dashboardController.createComment);

module.exports = router;