const Beer = require('../models/beer');
//const tester = require('../models/tester');

exports.index = (req, res) => {
      Beer.find()
      .populate('tester')
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
  exports.myBeer = (req, res) => {
    req.isAuthenticated();
      Beer.find({
        tester: req.session.userId
      })
      .populate('tester')
        .then(beers => {
          res.render('beers/index', {
            beers: beers,
            title: 'Beers You Had'
          });
        })
        .catch(err => {
          req.flash('error', `ERROR: ${err}`);
          res.redirect('/');
        });
    };

  //Show beer records associated with the type
  exports.type = (req, res) => {
    Beer.find({
      'type': req.params.type
    })
    .populate('tester')
      .then(beers => {
        res.render('beers/index', {
          beers: beers,
          title: `${req.params.type}`
        });

      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };

    //Show beer records associated with the style
    exports.style = (req, res) => {
      Beer.find({
        'style': req.params.style
      })
      .populate('tester')
        .then(beers => {
          res.render('beers/index', {
            beers: beers,
            title: `${req.params.style}`
          });
  
        })
        .catch(err => {
          req.flash('error', `ERROR: ${err}`);
          res.redirect('/');
        });
    };
//everyone can see the detail of a beer record
  exports.show = (req, res) => {
    //req.isAuthenticated();
    Beer.findOne({
      _id: req.params.id,
      //tester: req.session.userId
    })
    .populate('tester')
      .then(beer => {
        res.render('beers/show', {
          title: beer.name,
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
  Beer.findOne({
    _id: req.params.id,
    tester: req.session.userId
  })
      .then(beer => {
        res.render('beers/edit', {

          title: `Edit ${beer.name}`,
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
    Beer.create(
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
    Beer.updateOne({
        _id: req.body.id,
        tester:req.session.userId
      }, req.body.beer, {
        runValidators: true
      })
      .then(() => {
        req.flash('success', 'Your beer record was updated successfully.');
      res.redirect('/beers/myBeer');
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
    Beer.deleteOne({
        _id: req.body.id,
        tester: req.session.userId

      })
      .then(() => {
        req.flash('success', 'Your beer was deleted successfully.');
        res.redirect("/beers/myBeer");
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/beers/myBeer');
      });
  };



