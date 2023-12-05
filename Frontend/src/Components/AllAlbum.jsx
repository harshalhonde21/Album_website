import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/AlbumList.css';
import PhotoUpload from './PhotoUpload';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:5500/createAlbum/getAlbum');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, [albums]);

  const handleUploadSuccess = () => {
    fetchAlbums();
    setSelectedAlbum(null);
  };

  return (
    <div className="album-list-container">
      {albums.map((album) => (
        <div key={album._id} className="album-item" onClick={() => setSelectedAlbum(album._id)}>
          <h3>{album.title}</h3>
          <p>{album.description}</p>
          {selectedAlbum === album._id && (
            <PhotoUpload albumId={album._id} onUpload={handleUploadSuccess} />
          )}
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
