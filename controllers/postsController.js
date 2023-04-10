const Post = require('../models/Post');

exports.postsGetAll = async (req, res) => {
    const posts = await Post.find({}, 'title');
    res.render('posts', { posts: posts });
}

exports.postsGetPost = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).populate('author');
    res.render('post', { post: post });
}