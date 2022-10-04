const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const dashboardController = require('../controllers/dashboard-controller');
const withAuth = require("../utils/auth");

router.get('/', dashboardController.showAllPostsHomepage);

router.get('/homepage', dashboardController.showAllPostsHomepage);

router.get('/edit-post/:id', withAuth, dashboardController.loadEditPost);

router.get('/create-post', withAuth, (req, res) => {
  res.render('create-post');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/single-post/:id', withAuth, dashboardController.showSinglePost);

router.get('/dashboard', withAuth, dashboardController.showAllUserPosts);

router.get('/register', (req, res) => {
  res.render('register');
});

  module.exports = router;