const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
ire('dotenv').config();

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
