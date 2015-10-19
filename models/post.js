var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    body: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;