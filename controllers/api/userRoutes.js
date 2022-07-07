const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get api/users
router.get('/', async (req, res) => {
  try {
      const userData = await User.findAll({

          attributes: { exclude: ['password'] },
      })
      res.json(userData)
  } catch (err) {
      res.status(500).json(err);
  }
});

// get /api/users/1
router.get('/:id', async (req, res) => {
  try {
      const userData = await User.findOne({
          attributes: { exclude: ['password'] },
          where: {
              id: req.params.id
          },
          include: [
              {
                  model: Post,
                  attributes: ['id', 'title', 'content', 'date_created']
              },
              {
                  model: Comment,
                  attributes: ['id', 'content', 'date_created'],
                  include: {
                      model: Post,
                      attributes: ['title']
                  }
              }
          ]
      })
      if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
      }
      res.json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

//post /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
    }
   
  req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    
  } else {
    res.status(404).end();
  }
});

// edit /api/users/1
router.put('/:id', withAuth, async (req, res) => {
  try {
      const userData = await User.update(req.body, {
          individualHooks: true,
          where: {
              id: req.params.id
          }
      })
      if (!userData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
      }
      res.json(userData);
  } catch (err) {
  res.status(500).json(err);
}
});

// del /api/users/1
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const userData = awaitUser.destroy({
      where: {
          id: req.params.id
      }
  })
          if (!userData) {
              res.status(404).json({ message: 'User not found' });
              return;
          }
          res.json(userData);
      } catch (err) {
      res.status(500).json(err);
  }
  });

module.exports = router;