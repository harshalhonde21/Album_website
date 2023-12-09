import { Fragment, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import "../Css/AdminCreate.css";
import AllAlbum from "../Components/AllAlbum";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleCreateAlbum = async () => {
    try {
      if (!userId) {
        toast.error('Please provide a valid user ID');
        return;
      }
      await axios.post('http://localhost:5500/createAlbum/addAlbum', {
        title,
        description,
        userId,
      });

      toast.success('Album created successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating album:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    navigate('/admin');
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5500/user/signup', {
        username: newUser.username,
        password: newUser.password,
      });

      toast.success('User added successfully!');
      setIsAddUserOpen(false);
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <Fragment>
      <AllAlbum />
      <div className='outer-containerAdmin'>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        <div className="add-user-icon" onClick={() => setIsAddUserOpen(true)}>
          <h3>Add User</h3>
        </div>

        <div className="create-album-icon" onClick={() => setIsOpen(true)}>
          <AddIcon fontSize="large" />
        </div>

        {isAddUserOpen && (
          <div className="add-user-form">
            <label>Username:</label>
            <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />

            <label>Password:</label>
            <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />

            <button onClick={handleAddUser}>Add User</button>
            <button onClick={() => setIsAddUserOpen(false)}>Cancel</button>
          </div>
        )}

        {isOpen && (
          <div className="create-album-form">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>User ID:</label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />

            <button onClick={handleCreateAlbum}>Create Album</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AdminCreate;
