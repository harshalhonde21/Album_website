import { Fragment, useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import "../Css/AdminCreate.css";
import AllAlbum from "../Components/AllAlbum";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5500/user/getUser');
        setUserInfo(response.data.user);
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
    };

    if (isUserInfoOpen) {
      fetchUserInfo();
    }
  }, [isUserInfoOpen]);

  const handleCreateAlbum = async () => {
    try {
      if (!userId) {
        toast.error('Please provide a valid user ID');
        return;
      }
  
      const response = await axios.post('http://localhost:5500/createAlbum/addAlbum', {
        title,
        description,
        userId,
      });
  
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Album created successfully!');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error creating album:', error.message);
      toast.error('Failed to create album. Please try again.');
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

        <div className="user-info-icon" onClick={() => setIsUserInfoOpen(true)}>
          <h3>User Info</h3>
        </div>

        <div className="add-user-icon" onClick={() => setIsAddUserOpen(true)}>
          <h3>Add User</h3>
        </div>

        <div className="create-album-icon" onClick={() => setIsOpen(true)}>
          <AddIcon fontSize="large" />
        </div>

        {isUserInfoOpen && (
          <div className="user-info-table">
            <h2>User Info</h2>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setIsUserInfoOpen(false)}>Close</button>
          </div>
        )}

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
