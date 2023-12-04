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
    res.json({ _id: savedAlbum._id, title, description });
  } catch (error) {
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

    album.photos.push({ filename: photo.filename, path: photo.path });
    await album.save();

    res.json({ message: 'Photo added to album successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
