const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Sign up route
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        });
        req.session.userId = user.id;
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Log in route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Log out route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
