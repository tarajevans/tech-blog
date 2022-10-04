const router = require("express").Router();
const dashboardController = require('../../controllers/dashboard-controller.js');
const withAuth = require("../../utils/auth.js");

router.post('/createPost', withAuth, dashboardController.createNewPost);
router.post('/comment', withAuth, dashboardController.createComment);
router.put('/edit/:id', withAuth, dashboardController.editComment);
router.delete('/delete/:id', withAuth, dashboardController.deleteComment);
router.put('/edit-post/:id', withAuth, dashboardController.editPost);
router.delete('/deletePost/:id', withAuth, dashboardController.deletePost);

module.exports = router;