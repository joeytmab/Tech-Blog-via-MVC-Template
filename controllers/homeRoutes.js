const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

// Route to render home page
// Base route for homepage.handlebars
router.get('/', async (req, res) => {
  try {
    // Get all post data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data
    // use .map to create new array of posts
    const posts = postData.map((post) => post.get({ plain: true }));

    //render homepage
    res.render('homepage', {
      posts,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Custom middleware required before allowing the user to access post
// Once logged in, can view post by Id; needed to add comments.
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Get post data with match id from req params
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });

    const post = postData.get({ plan: true });
    const postUser = post.user.get({ plan:true });

    // Get all comment belongs to the post with match id from req params
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
    });

    //create new array of created comments
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('post', {
      ...post,
      postUser,
      comments,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Custom middleware authentication is required before
// allowing the user to access dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Loads dashboard handlebar
    res.render('dashboard', {
      posts,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/api/dashboard');
    return;
  }

  res.render('login');
});

// Signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;