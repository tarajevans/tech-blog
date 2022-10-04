const {Post, User, Comment} = require("../models");

const dashboardController = {

    createNewPost: (req, res) => {
        Post.create({
            title: req.body.title,
            content_txt: req.body.content_txt,
            user_id: req.session.user_id,
        }).then((results) => {
            res.json(results);
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
            for (let i = 0; i < posts.length; i++){
                Comment.findAll({
                    where: {post_id:posts[i].id}
                }).then((postComments) => {
                    Object.assign(posts[i], {commentCount: postComments.length});
                })
            }
            res.render('dashboard', {posts});
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    editPost: (req,res) => {
        Post.update({
            ...req.body
        },
        {
            where: {
                id: req.params.id,
            }
        }).then((status) => {
        res.json(status);
    }).catch((err) => {
        res.status(500).json(err);
    })
    },

    loadEditPost: (req, res) => {
        Post.findByPk((req.params.id), {
            include:[{
                model: User,
                attributes: ["username"],
                required: true,
            }],
             raw:true,
             nest: true,
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
            Object.assign(singlePost, {commentCount: postComments.length});
                res.render('edit-post', {singlePost, postComments});
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          })
    },

    deletePost: (req, res) => {
        Post.destroy({
            where: {
                id: req.params.id,
            }
        }).then((result) => {
                res.json(result);
            }).catch((err) => {
            res.status(500).json(err);
        });
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
            for (let i = 0; i < posts.length; i++){
                Comment.findAll({
                    where: {post_id:posts[i].id}
                }).then((postComments) => {
                    Object.assign(posts[i], {commentCount: postComments.length});
                })
            }
            res.render('homepage', {posts});
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    createComment: (req, res) => {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    editComment: (req, res) => {
            Comment.update({
                    ...req.body
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }).then((updatedComment) => {
                res.json(updatedComment);
            }).catch((err) => {
                res.status(500).json(err);
            })
    },

    deleteComment: (req, res) => {
        Comment.findByPk((req.params.id),{
            attributes: ["post_id"]
        }).then((postId) => {
            Comment.destroy({
                where: {
                    id: req.params.id,
                }
            }).then((result) => {
                res.json(result);
            }).catch((err) => {
                res.status(500).json(err);
            });
        })
    },

} 

module.exports = dashboardController;