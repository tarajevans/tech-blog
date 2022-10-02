const {Post, User, Comment} = require("../models");

const dashboardController = {

    createNewPost: (req, res) => {
        Post.create({
            title: req.body.title,
            content_txt: req.body.content_txt,
            user_id: req.session.user_id,
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    showSinglePost: (req, res) => {
        Post.findOne({
            where: {
                id:req.params.id,
            },
            include:{
                model:User, 
                attributes:["username"]
            },
            nest:true,
            raw:true,
        }).then((singlePost) => {
            Comment.findAll({
                where:{post_id:req.params.id},
                include:{
                    model:User, 
                    attributes:["username"]
                },
                nest:true,
                raw:true,
            }).then((postComments) => {
                res.render('single-post', {singlePost, postComments});
            })
        }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
              })
    },

    showAllUserPosts: (req,res) => {
        Post.findAll({
            where:{
                user_id: req.session.user_id,
            },
            include:{
                model: User,
                attributes: ["username"],
                required: true,
             },
             raw:true,
             nest: true,
        }).then((posts) => {
            console.log(posts);
            res.render('dashboard', {posts});
            // res.render('homepage', posts);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    editPost: (req,res) => {

    },

    showAllPostsHomepage: (req, res) => {
        Post.findAll({
            // raw: true,
            include:[{
                model: User,
                attributes: ["username"],
                required: true,
            }],
             raw:true,
             nest: true,
        }).then((posts) => {
            for (let i = 0; i<posts.length; i++){
                Comment.findAll({
                    where: {post_id:posts[i].id}
                }).then((postComments) => {
                    Object.assign(posts[i], {commentCount: postComments.length});
                })
            }
            // console.log(posts.dataValues.user);
            res.render('homepage', {posts});
            // res.render('homepage', posts);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    createComment: (req, res) => {
        console.log(req.body);
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    }

} 

module.exports = dashboardController;