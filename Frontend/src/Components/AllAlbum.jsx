import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/AlbumList.css';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:5500/createAlbum/getAlbum');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error.message);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="album-list-container">
      {albums.map((album) => (
        <div key={album._id} className="album-item">
          <h3>{album.title}</h3>
          <p>{album.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
