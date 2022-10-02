const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const dashboardController = require('../controllers/dashboard-controller');
const withAuth = require("../utils/auth");

router.get('/', dashboardController.showAllPostsHomepage);

router.get('/homepage', dashboardController.showAllPostsHomepage);

router.get('/test', dashboardController.showAllPostsHomepage);

router.get('/create-post', (req, res) => {
  res.render('create-post');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', dashboardController.showAllUserPosts);

// router.get('/logout', (req, res) => {
//   //res.render('homepage');
// });

router.get('/register', (req, res) => {
  res.render('register');
});

  module.exports = router;