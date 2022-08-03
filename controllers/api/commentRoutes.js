const router = require('express').Router();
// Comment model (according to MVC) required for comment routing.
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// Route to create a new comment
// Middleware authentication required; only users can comment on posts.
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.body.postId,
      user_id: req.session.user_id,
      username: req.session.username,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;