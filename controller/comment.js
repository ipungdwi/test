const {Comment, Photo, User} = require("../models");

module.exports = {
    createComment: async (req, res) => {
        try {
            const UserId = req.user.id;
            const {comment, PhotoId} = req.body;
            const newComment = new Comment({
                UserId, comment, PhotoId
            });
            await newComment.save().catch(()=>{
                throw {
                    code: 400
                };
            });
            res.status(201).json({
                comment: {
                    id: newComment.id,
                    comment: newComment.comment,
                    UserId: newComment.UserId,
                    PhotoId: newComment.PhotoId,
                    updatedAt: newComment.updatedAt,
                    createdAt: newComment.createdAt
                }
            })
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    },
    getComments: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [{
                    model: Photo,
                    attributes: ["id", "title", "caption", "poster_image_url"]
                },{
                    model: User,
                    attributes: ["id", "username", "profile_image_url", "phone_number"]
                }]
            });
            res.json({
                comments
            });
        } catch (err) {
            res.sendStatus(500);
        }
    },
    updateComment: async (req, res) => {
        try{
            const {commentId} = req.params;
            const {comment = null} = req.body;
            const updatedComment = await Comment.findByPk(commentId, {});
            if(req.user.id !== updatedComment.UserId) {
                throw {
                    code: 403
                }
            }
            await updatedComment.update({
                comment
            }).catch(()=>{
                throw {
                    code: 400
                };
            });
            res.json({
                comment: updatedComment
            });
        }catch (err) {
            res.sendStatus(err.code || 500);
        }
    },
    deleteComment: async (req, res) => {
        try{
            const {commentId} = req.params;
            const deletedComment = await Comment.findByPk(commentId, {});
            if(!deletedComment){
                throw {
                    code: 404
                }
            }
            if(req.user.id !== deletedComment.UserId) {
                throw {
                    code: 403
                }
            }
            await deletedComment.destroy();
            res.json({
                message: "Your comment has been successfully deleted"
            });
        }catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
};