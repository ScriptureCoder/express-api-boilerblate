const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String,  default: "",  required:true },
    lastName: { type: String,  default: ""},
    email: { type: String,  default: "",  required:true,  unique: true},
    password: { type: String,  default: "",  required:true },
    createdAt: { type: Date,  default: Date.now()},
    deletedAt: { type: Boolean,  default: false,},
});


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
