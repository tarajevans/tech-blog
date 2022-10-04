const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const dashboardController = require('../controllers/dashboard-controller');
const postController = require('../controllers/post-controller.js');
const withAuth = require("../utils/auth");

router.get('/', postController.showAllPostsHomepage);

router.get('/homepage', postController.showAllPostsHomepage);

router.get('/edit-post/:id', withAuth, postController.loadEditPost);

router.get('/create-post', withAuth, (req, res) => {
  res.render('create-post');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/single-post/:id', withAuth, postController.showSinglePost);

router.get('/dashboard', withAuth, postController.showAllUserPosts);

router.get('/register', (req, res) => {
  res.render('register');
});

  module.exports = router;