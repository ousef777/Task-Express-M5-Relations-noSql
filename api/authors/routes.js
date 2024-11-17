const express = require('express');
const router = express.Router();
const {
  fetchAuthor,
  postsGet,
  postsUpdate,
  postsDelete,
  authorCreate,
  postsCreate,
  authorsGet
} = require('./controllers');

router.param('authorId', async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error('Author Not Found');
    err.status = 404;
    next(err);
  }
});

router.get('/', postsGet);
router.post('/', authorCreate);
router.post('/:authorId/post', postsCreate);

router.delete('/:postId', postsDelete);

router.put('/:postId', postsUpdate);

module.exports = router;