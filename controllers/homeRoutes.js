const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'date_created'
      ],

      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name']
       }
        }
      ]
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

// GET post by ID, render
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'date_created'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('post', {
        ...post,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json(err);
}
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

  res.render('signup');
    });

module.exports = router;