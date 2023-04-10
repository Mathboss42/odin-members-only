const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 2 },
    text: { type: String, required, minLength: 10 },
    timeStamp: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

PostSchema.virtual("url").get(function () {
    return `/posts/${this._id}`;
});

PostSchema.virtual("timeStampFormatted").get(function () {
    return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', PostSchema);