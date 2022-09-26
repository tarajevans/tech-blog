const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
  req.session.name="tech-blog";
  console.log(req.session.name);
  res.render('homepage');
});
router.get('/homepage', (req, res) => {
  res.render('homepage', {loggedIn: req.session.loggedIn});
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
router.get('/logout', (req, res) => {
  res.render('homepage');
});
router.get('/register', (req, res) => {
  res.render('register');
});
  module.exports = router;