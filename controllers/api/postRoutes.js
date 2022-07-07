const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


//need to get all users first
router.get('/', async (req, res) => {
  try {
      const getData = await Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'date_created'
          ],
          order: [['date_created', 'ASC']],
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
              },
          ]
      })
      res.json(getData)
  } catch (err) {
      res.status(500).json(err);
  }
});

//get User by ID
router.get('/:id', async (req, res) => {
  try {
      const getData = await Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'title',
              'content',
              'date_created'
          ],
          include: [
              {
                  model: User,
                  attributes: ['name']
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
      })
      if (!getData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(getData);
      
  } catch (err) {
      res.status(500).json(err);
  }
});

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
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content
    },
      { 
        where: {
        id: req.params.id,
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