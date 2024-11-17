const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: String,
  body: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  tags: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }
  ]
});

module.exports = model('Post', PostSchema);
