const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  UserId: {
    type: String,
    // required: true
  },
  UserName: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  // Data: {
  //     type: String,
  //     // required: true
  // }
});
UserSchema.index({ UserName: 1 });
UserSchema.index({ Email: 1 });
module.exports = mongoose.model('Users', UserSchema);
