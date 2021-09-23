import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  name: {
    type: String,
    required: true
  },

  listItems: {
    type: [String]
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

const List = new mongoose.model('list', ListSchema);

export default List;
