import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const albumSchema = new mongoose.Schema({
  title: String,
  description: String,
  photos: [photoSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
