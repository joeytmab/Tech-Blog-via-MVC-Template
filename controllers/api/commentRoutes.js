const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//add comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            username: req.session.username,
            post_id: req.body.post_id,
        })

        if (!commentData) {
            res.status(500).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json(commentData);
        
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;