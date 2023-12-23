import { useState } from 'react';
import axios from 'axios';
import '../Css/PhotoUpload.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import MUI icon
import toast from 'react-hot-toast';

const PhotoUpload = ({ albumId, onUpload }) => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      await axios.post(`https://album-website.onrender.com/createAlbum/addPhoto/${albumId}`, formData);
      onUpload();
      toast.success('Photo Added successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error.message);
      toast.error('Photo not added?');
    }
  };

  return (
    <div className="photo-upload-container">
      <label htmlFor="photo-upload-input" className="photo-upload-label">
        <CloudUploadIcon fontSize="large" style={{ fontSize: 48 }}  />
        Upload Photo
      </label>
      <input
        type="file"
        accept="image/*"
        id="photo-upload-input"
        className="photo-upload-input"
        onChange={handleFileChange}
      />
      <button className="photo-upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default PhotoUpload;
