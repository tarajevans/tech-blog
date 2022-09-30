const {Post, User, Comment} = require("../models");

const dashboardController = {

    createNewPost: (req, res) => {
        console.log(req.body);
        Post.create({
            title: req.body.title,
            content_txt: req.body.content_txt,
            user_id: req.session.user_id,
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    showAllUserPosts: (req,res) => {

    },

    editPost: (req,res) => {

    },

    showAllPostsHomepage: (req, res) => {
        Post.findAll({
            // raw: true,
            include:{
                model: User,
                attributes: ["username"],
                required: true,
             },
             raw:true,
             nest: true,
        }).then((posts) => {
            console.log(posts);
            // console.log(posts.dataValues.user);
            res.render('homepage', {posts});
            // res.render('homepage', posts);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    }

};

module.exports = dashboardController;