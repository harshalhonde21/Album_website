import Album from '../Models/Album.js';

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const createAlbum = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newAlbum = new Album({ title, description });
    const savedAlbum = await newAlbum.save();
    res.json(savedAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
