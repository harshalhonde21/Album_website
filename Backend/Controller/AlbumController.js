import Album from '../Models/Album.js';
import User from "../Models/User.js";
import fs from 'fs';
import mongoose from 'mongoose';

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const createAlbum = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Clean up User ID
    const cleanUserId = userId.trim();

    // Retrieve User
    const user = await User.findById(cleanUserId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create Album
    const newAlbum = new Album({ title, description, user: cleanUserId });
    const savedAlbum = await newAlbum.save();

    // Update User's Albums
    user.albums.push(savedAlbum._id);
    await user.save();

    // Response
    res.json({ savedAlbum });
  } catch (error) {
    console.error('Error creating album:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



export const addPhotoToAlbum = async (req, res) => {
  const { albumId } = req.params;
  const photo = req.file;

  try {
    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    const imageBuffer = fs.readFileSync(photo.path);
    const base64Image = imageBuffer.toString('base64');
    const shortenedBase64 = base64Image.replace(/[\s+/]/g, '');

    album.photos.push({
      filename: photo.filename,
      path: photo.path,
      base64: shortenedBase64,
    });

    await album.save();

    res.json({ message: 'Photo added to album successfully', base64Image: shortenedBase64 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

