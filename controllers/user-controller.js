const {User} = require('../models');

const userController = {
    
    createUser:(req, res) => {
        User.create({
            username:req.body.username,
            password: req.body.password[0],
            email:req.body.email,

        }).then((userData) => {
            req.session.save(()=> {
            req.session.user_id = userData.id; 
            req.session.username = userData.username;
            req.session.loggedIn = true; 
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
};

module.exports = userController;