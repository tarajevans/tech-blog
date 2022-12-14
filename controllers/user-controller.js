const { User } = require("../models");

const userController = {
    // create a user in the DB base on sorm submition information. 
    createUser: (req, res) => {
      console.log('create user called with username: ' + req.body.username + ' and password of: ' + req.body.password);
        User.create({
            username:req.body.username,
            password: req.body.password,
        }).then((userData) => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            req.session.save();
        }).then((result) => {
          res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    login: (req, res) => {
        // expects {email: 'yourEmail@yourDomain.whatever', password: 'password1234'}
        User.findOne({
          where: {
            username: req.body.username,
          },
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(400).json({ message: "No user with that name!" });
              return;
            }
            
            // Verify user
            const isValidPassword = dbUserData.checkPassword(req.body.password);
            if (!isValidPassword) {
              res.status(400).json({ message: "Incorrect password!" });
              return;
            }
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.email = dbUserData.email;
              req.session.loggedIn = true;
              req.session.save();
              res.json({
                user: dbUserData.username,
                message: "You are now logged in",
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      logout: (req, res) => {
        if(req.session){
          req.session.destroy((err) => {
            console.log("LOG OUT CALLED");
            res.render('homepage');
          });  
        }else{
          res.render('homepage');
        }
                
      },
};

module.exports = userController;