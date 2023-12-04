import { Fragment, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import "../Css/AdminCreate.css"
import AllAlbum from "../Components/AllAlbum";

const AdminCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateAlbum = async () => {
    try {
      await axios.post('http://localhost:5500/createAlbum/addAlbum', {
        title,
        description,
      });
      alert('Album created successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating album:', error.message);
    }
  };

  return (
    <Fragment>
    <div className='outer-containerAdmin'>
      <div className="create-album-icon" onClick={() => setIsOpen(true)}>
        <AddIcon fontSize="large" />
      </div>
      
      {isOpen && (
        <div className="create-album-form">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <button onClick={handleCreateAlbum}>Create Album</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      )}
      <AllAlbum />
      </div>
    </Fragment>
  );
};

export default AdminCreate;
