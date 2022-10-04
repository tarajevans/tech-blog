const {Post, User, Comment} = require("../models");

const commentsController = {
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

module.exports = commentsController;