const {Post, User, Comment} = require("../models");

const postController = {

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
                Object.assign(singlePost, {commentCount: postComments.length});
                for(let i = 0; i < postComments.length; i++){
                    if (postComments[i].user_id == req.session.user_id || singlePost.user_id == req.session.user_id){
                        Object.assign(postComments[i], {showButtons: true});
                    }else{
                        Object.assign(postComments[i], {showButtons: false});
                    }
                }
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
            posts=posts.reverse();
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
                for(let i = 0; i < postComments.length; i++){
                    if (postComments[i].user_id == req.session.user_id || singlePost.user_id == req.session.user_id){
                        Object.assign(postComments[i], {showButtons: true});
                    }else{
                        Object.assign(postComments[i], {showButtons: false});
                    }
                }
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
            posts=posts.reverse();
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
    }
}

module.exports = postController;