const Post = require('../models/Post');

exports.postsGetAll = async (req, res) => {
    const posts = await Post.find({}, 'title');
    console.log(posts)
    res.render('posts', { posts: posts });
}

exports.postsGetPost = async (req, res) => {
    const post = await Post.find({ _id: req.params.id });
    res.render('post', { post: post });
}