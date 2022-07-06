const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//POST
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);
  }
});

//PUT route (modify by ID)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

  res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err)
  }
});

//DELETE route (by id)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id. Ya dummy!' });
      return;
    }

    res.status(200).json(postData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST route (for comments, sort by ID)
router.post('/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

  res.status(200).json(newComment);

  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;