const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//display new form for new post creation
router.get('/new', withAuth, async (req, res) => {
  try {

    const newPost = true;

    res.render('postForm', {
      newPost,
      username: req.session.username,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display current post form with value to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    const editPost = true;

    res.render('postForm', {
      ...post,
      editPost,
      username: req.session.username,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.post('/update/:id', withAuth,  async (req, res) => {
try {

  const updatedPost = await Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );

  res.status(200).json(updatedPost);
} catch (err) {
  res.status(400).json(err);
}
});

// create post
router.post('/', withAuth,  async (req, res) => {
try {

  const newPost = await Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  });

  res.status(200).json(newPost);

} catch (err) {
  res.status(400).json(err);
}
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
try {
  const deletePost = await Post.destroy({
    where: {
      id: req.params.id,
    }
  })

  if (!deletePost) {
    res.status(404).json({ message: 'No post found with this id!' });
    return;
  }

  res.status(200).json(deletePost);
  
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;