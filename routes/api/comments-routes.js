const router = require("express").Router();
const commentsController = require('../../controllers/comments-controller.js');
const withAuth = require("../../utils/auth.js");

router.post('/', withAuth, commentsController.createComment);
router.put('/:id', withAuth, commentsController.editComment);
router.delete('/:id', withAuth, commentsController.deleteComment);

module.exports = router;