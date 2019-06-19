const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const TesterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

//VIRTUAL PROPERTY (This will not go on database)
TesterSchema.virtual('passwordConfirmation')
  .get(() => this.passwordConfirmation)
  .set((value) => this.passwordConfirmation = value);

  //Help actions

  // Our presave operations
// This will hash our password before we save
//Hashes the password using a salt key
TesterSchema.pre('save', function (next) {
    const tester = this;
    if (!tester.isModified('password')) return next;
    if (tester.password !== tester.passwordConfirmation) throw new Error('Your password does not match your password confirmation');
  
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(tester.password, salt, (err, hash) => {
        if (err) return next(err);
  
        tester.password = hash;
        next();
      });
    });
  });

  // This will allow us to compare our password to plain text
  //Authenticate our plain text password against our hashed password
TesterSchema.methods.authenticate = function (plainPassword, callback) {
    // plain text, hash, callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };
module.exports = mongoose.model('Tester', TesterSchema);