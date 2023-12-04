import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
