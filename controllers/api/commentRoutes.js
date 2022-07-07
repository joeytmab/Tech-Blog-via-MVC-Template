const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.json(CommentData)

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })

            .then(CommentData => res.json(CommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!commentData) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.json(commentData);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;