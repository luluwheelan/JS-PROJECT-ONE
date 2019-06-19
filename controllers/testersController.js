const Tester = require('../models/tester');


exports.new = (req, res) => {
  res.render('testers/new', {
    title: `New Tester`
  });
};


exports.create = (req, res) => {
  Tester.create(req.body.tester)
    .then(() => {
      req.flash('success', 'Your are now registered.');
      res.redirect('/login');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/testers/new');
    });
};
