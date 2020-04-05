const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('contact');
  })
  .post((req, res) => {
    res.redirect(301, 'home');
  });

module.exports = {
  router,
};
