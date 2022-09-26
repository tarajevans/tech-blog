const { User } = require("../models");

const userController = {
    // create a user in the DB base on sorm submition information. 
    createUser: (req, res) => {
        User.create({
            username:req.body.username,
            password: req.body.password,
            email: req.body.email,
        }).then((userData) => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    login: (req, res) => {
        // expects {email: 'yourEmail@yourDomain.whatever', password: 'password1234'}
        User.findOne({
          where: {
            email: req.body.email,
          },
        })
          .then((dbUsersData) => {
            if (!dbUsersData) {
              res.status(400).json({ message: "No user with that name!" });
              return;
            }
            //res.json({ user: dbUserData });
    
            // Verify user
            const isValidPassword = dbUsersData.checkPassword(req.body.password);
            if (!isValidPassword) {
              res.status(400).json({ message: "Incorrect password!" });
              return;
            }
            req.session.save(() => {
              req.session.user_id = dbUsersData.id;
              req.session.username = dbUsersData.username;
              req.session.loggedIn = true;
            });
              res.json({
                user: dbUsersData.username,
                message: "You are now logged in",
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};

module.exports = userController;