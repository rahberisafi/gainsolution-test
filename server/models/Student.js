var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: { type: Number },
  dob: { type: Number },
  subject: String,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);