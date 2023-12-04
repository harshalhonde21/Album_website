import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model('AdminAlbum', userSchema);

export default UserModel;
