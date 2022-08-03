const router = require('express').Router();
// Post model (according to MVC practice) required here.
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to display form to create new post
router.get('/new', withAuth, async (req, res) => {
  console.log("route to get form to create new post triggered.")
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

// Route to create a new post
router.post('/', withAuth,  async (req, res) => {
  console.log("route to post created post entry triggered.")
  try {

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to display current post form with value to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  console.log("route to edit current post triggered.")
  try {

    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plan: true });
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

// Route to update a post
// first, route to EDIT POST
// then, we can UPDATE POST with new title and content.
router.post('/update/:id', withAuth,  async (req, res) => {
  console.log("post edited. route to UPDATE post with new title/content triggered.")
  try {

    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
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

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  console.log("route to delete post triggered.")
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deletePost) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;