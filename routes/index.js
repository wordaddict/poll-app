const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');

var router = express.Router();

var env = {

};

router.get('/', (req, res, next) => {
  res.render('index', { env: env});
});

router.get('/login', (req, res) => {
  res.render('login', { env: env });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/polls', ensureLoggedIn, (req, res) => {
  if(!error && response.statusCode == 200) {
    var polls = JSON.parse(body);
    res.render('polls', {env: env, user: req.user, polls: polls})
  } else {
    res.render('error');
  }
});

router.get('/user', ensureLoggedIn, (req, res, next) => {
  res.render('/user', { env: env, user: req.user })
});

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};

router.get('/callback',
passport.authenticate('auth0', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect(req.session.returnTo || '/polls');
});

module.exports = router;
