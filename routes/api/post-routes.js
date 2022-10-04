const router = require("express").Router();
const postController = require('../../controllers/post-controller.js');
const withAuth = require("../../utils/auth.js");

// router.get('/', )
router.post('/', withAuth, postController.createNewPost);
router.put('/:id', withAuth, postController.editPost);
router.delete('/:id', withAuth, postController.deletePost);

module.exports = router;