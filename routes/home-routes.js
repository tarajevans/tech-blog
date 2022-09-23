const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

  module.exports = router;