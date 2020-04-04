const router = require('express').Router();

const movies = [
  'Crash',
  'Fight Club',
  'The Matrix',
];

router.route('/')
  .get((req, res) => {
    res.json(movies);
  })
  .post(() => {
  });

module.exports = {
  router,
};
