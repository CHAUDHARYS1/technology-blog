const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User, Post, Comment
} = require('../models');

// router.get('/', (req, res) => {
//     res.send("Home Route");
//     console.log(req.body);
// });


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
        ],
        include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
          posts
        //   loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
    res.redirect('/');
    return;
    
    res.render('login');
});


module.exports = router;