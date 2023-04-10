const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, minLength: 2, maxLength: 100 },
    lastName: { type: String, required: true, minLength: 2, maxLength: 100 },
    userName: { type: String, required: true, minLength: 2, maxLength: 100 },
    password: { type: String, required: true, minLength: 8, maxLength: 16 },
    status: { type: String, enum: ['user', 'member'] }
});

module.exports = mongoose.model('User', UserSchema);