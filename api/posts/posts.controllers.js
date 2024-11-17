const Post = require('../../models/Post');
const Tag = require('../../models/Tag');

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
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

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find({}, '-createdAt -updatedAt')
    .populate('authorId', 'name')
    .populate('tags', 'name');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagAdd = async (req, res) => {
  try {
    console.log(req.body);
    const newTag = await Tag.create(req.body);
    await Post.findByIdAndUpdate(req.post.id , {
        $push: { tags: newTag },
      });
    await Tag.findByIdAndUpdate(newTag._id , {
      $push: { posts: req.post.id },
    });
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
}

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Post.find({}, '-createdAt -updatedAt').populate(
        'Tag',
        ['name', 'posts']
      );
    res.json(posts);
  } catch (error) {
    next(error);
  }
};