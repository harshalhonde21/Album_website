import { useState } from 'react';
import axios from 'axios';
import '../Css/PhotoUpload.css';

const PhotoUpload = ({ albumId, onUpload }) => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      await axios.post(`http://localhost:5500/createAlbum/addPhoto/${albumId}`, formData);
      onUpload();
    } catch (error) {
      console.error('Error uploading photo:', error.message);
    }
  };

  return (
    <div className="photo-upload-container">
      <input
        type="file"
        accept="image/*"
        className="photo-upload-input"
        onChange={handleFileChange}
      />
      <button className="photo-upload-button" onClick={handleUpload}>
        Upload Photo
      </button>
    </div>
  );
};

export default PhotoUpload;
