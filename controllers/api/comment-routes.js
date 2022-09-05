const router = require('express').Router();
// const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// api/comments/
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

// create a comment route
// api/comments
// add withAuth here
router.post('/', (req, res) => {
    // check the session
     Comment.create({
       comment_text: req.body.comment_text,
       post_id: req.body.post_id,
       // use the id from the session
       user_id: req.user_id
     })
       .then(dbCommentData => res.json(dbCommentData))
       .catch(err => {
         console.log(err);
         res.status(400).json(err);
       });
   
 });

// delete comment route
// api/comments/:id
// add withAuth here
router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});



module.exports = router;