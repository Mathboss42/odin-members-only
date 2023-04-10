const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, minLength: 2, maxLength: 100 },
    lastName: { type: String, required: true, minLength: 2, maxLength: 100 },
    userName: { type: String, required: true, minLength: 2, maxLength: 100 },
    password: { type: String, required: true, minLength: 8},
    status: { type: String, enum: ['user', 'member'] }
});

UserSchema.virtual("name").get(function () {
    // To avoid errors in cases where a user does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if (this.firstName && this.lastName) {
        fullname = `${this.lastName}, ${this.firstName}`;
    }
    if (!this.firstName || !this.lastName) {
        fullname = "";
    }
    return fullname;
});

module.exports = mongoose.model('User', UserSchema);