const express = require('express');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./routes");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {Post, User, Comment} = require ("./models");


const path = require("path");

// Initialize (create) the express object.
const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

const myStore = new SequelizeStore({
  db: sequelize,
});

const sess = {
  secret:'Kepping it safe',
  name:'tech-blog',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  maxAge: 600000,
  store: myStore,
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

myStore.sync();
//Post.sync({force:true});


sequelize.sync({ force: false }).then(() => {
    //One method/function that starts the server
    app.listen(PORT, () => console.log("Now listening on port " + PORT));
  });