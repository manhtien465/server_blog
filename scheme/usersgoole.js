var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  updated_at: { type: Date, default: Date.now },
  
},
{
  collection: 'usergoogle'
},);



module.exports = mongoose.model('User', UserSchema);