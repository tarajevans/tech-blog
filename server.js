const express = require('express');
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./routes");

const path = require("path");

// Initialize (create) the express object.
const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

app.listen(PORT, () => console.log("Now listening on port " + PORT));