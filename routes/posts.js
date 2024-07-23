const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// Create a new post
router.post('/new', async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

// View a single post with comments
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [{ model: Comment, include: [User] }]
        });
        res.render('post', { post });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a comment to a post
router.post('/:id/comment', async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            postId: req.params.id,
            userId: req.session.userId
        });
        res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
