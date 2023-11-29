// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');

// Create comment
router.post('/create', function(req, res, next) {
    var comment = new Comment({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post_id
    });
    comment.save(function(err, comment) {
        if (err) {
            return res.redirect('/');
        }
        Post.findById(req.body.post_id, function(err, post) {
            if (err) {
                return res.redirect('/');
            }
            post.comments.push(comment);
            post.save(function(err, post) {
                if (err) {
                    return res.redirect('/');
                }
                User.findById(req.user._id, function(err, user) {
                    if (err) {
                        return res.redirect('/');
                    }
                    user.comments.push(comment);
                    user.save(function(err, user) {
                        if (err) {
                            return res.redirect('/');
                        }
                        return res.redirect('/posts/' + req.body.post_id);
                    });
                });
            });
        });
    });
});

// Update comment
router.post('/update/:id', function(req, res, next) {
    Comment.findByIdAndUpdate(req.params.id, {
        content: req.body.content
    }, function(err, comment) {
        if (err) {
            return res.redirect('/');
        }
        return res.redirect('/posts/' + comment.post);
    });
});

// Delete comment
router.post('/delete/:id', function(req, res, next) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            return res.redirect('/');
        }
        Post.findById(comment.post, function(err, post) {
            if (err) {
                return res.redirect('/');
            }
            post.comments.remove(comment);
            post.save(function(err, post) {
                if (err) {
                    return res.redirect('/');
                }
                User.findById(comment.user, function(err, user) {
                    if (err) {
                        return res.redirect('/');
                    }
                    user.comments.remove(comment);
                    user.save(function(err, user) {
                        if (err) {
                            return res.redirect('/');
                        }
                        return res.redirect('/posts/' + comment.post);
                    });
                });
            });
        });
    });
});

module.exports = router;