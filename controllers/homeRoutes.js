const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      logged_In: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET form, render
router.get("/form", (req, res) => {
  res.render("myForm")
})

// GET '/login' (login form)
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
    });

// GET '/signup' (registration form)
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
    });

// Use withAuth middleware to prevent access to route
// /dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({

    where: {
      user_id: req.session.user_id,
      },
      include: [
        {
        model: User,
        attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) =>
    post.get({ plain: true })
  );

  res.render('dashboard', {
    posts,
    logged_In: req.session.logged_in,
  });

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

//GET for render new posts
router.get('/dashboard/new', withAuth, async (req, res) => {
  res.render('create-post');
});

//GET single post by ID
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,  {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const post = postData.get({plain: true});
    const comments = commentData.map((comment) => comment.get({plain: true}));

    res.render("post", {
      post,
      comments,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//GET edit post
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({plain: true});
  
    res.render("edit-post", {
      ...post,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  };
  });

module.exports = router;