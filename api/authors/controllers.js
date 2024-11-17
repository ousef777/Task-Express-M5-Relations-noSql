const Author = require('../../models/Author');
const Post = require('../../models/Post');

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
}

exports.postsCreate = async (req, res) => {
  try {
    console.log(req.body);
    req.body.authorId = req.author.id;
    const newPost = await Post.create(req.body);
    await Author.findByIdAndUpdate(req.author.id, {
        $push: { posts: newPost._id },
      });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsGet = async (req, res) => {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (error) {
      next(error);
    }
  };

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find({}, '-createdAt -updatedAt').populate(
        'authorId',
        ['name', 'posts']
      );
    res.json(posts);
  } catch (error) {
    next(error);
  }
};