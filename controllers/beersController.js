const beer = require('../models/beer');

exports.index = (req, res) => {
      beer.find()
      .then(beers => {
        res.render('beers/index', {
          beers: beers,
          title: 'Beer We Tested'
        });

      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };
//Show only the beer records associated with the tester 
  exports.archive = (req, res) => {
    req.isAuthenticated();
      Beer.find({
        tester: req.session.userId
      })
      .populate('tester')
        .then(beers => {
          res.render('beers/index', {
            beers: beers,
            title: 'My Beers'
          });
  
        })
        .catch(err => {
          req.flash('error', `ERROR: ${err}`);
          res.redirect('/');
        });
    };

  exports.show = (req, res) => {
    req.isAuthenticated();
    beer.findOne({
      _id: req.params.id,
      tester: req.session.userId
    })
      .then(beer => {
        res.render('beers/show', {
          title: beer.title,
          beer: beer
        });

      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/beers');
      });
  };

  exports.new = (req, res) => {
    req.isAuthenticated();

    res.render('beers/new', {
      title: 'New beer Post'
    });
  };

//edit and show almost the same, they use same form
exports.edit = (req, res) => {
  req.isAuthenticated();
  beer.findOne({
    _id: req.params.id,
    tester: req.session.userId
  })
      .then(beer => {
        res.render('beers/edit', {

          title: `Edit ${beer.title}`,
          beer: beer
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/beers');
      });
  };


exports.create = (req, res) => {
  req.isAuthenticated();
  req.body.beer.tester = req.session.userId;
    beer.create(
        req.body.beer
    )
    .then(() => {
        req.flash('success', 'Your new beer record was created successfully.')
        res.redirect('/beers');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('beers/new', {

          beer: req.body.beer,
          title: 'New beer'
        });
      });
  };


  exports.update = (req, res) => {
    req.isAuthenticated();
    beer.updateOne({
        _id: req.body.id,
        tester:req.session.userId
      }, req.body.beer, {
        runValidators: true
      })
      .then(() => {
        //Go to single beer
        //res.redirect(`/beers/${req.body.id}`);

        req.flash('success', 'Your beer record was updated successfully.');
      res.redirect('/beers');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.render('beers/edit', {
        beer: req.body.beer,
        title: `Edit ${req.body.beer.name}`
      });

    });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();
    beer.deleteOne({
        _id: req.body.id,
        tester: req.session.userId

      })
      .then(() => {
        req.flash('success', 'Your beer was deleted successfully.');
        res.redirect("/beers");
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/beers');
      });
  };



