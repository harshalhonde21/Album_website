import { useState } from 'react';
import axios from 'axios';
import '../Css/User.css';
import {useNavigate} from "react-router-dom"

const User = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5500/user/login', {
        username,
        password,
      });

      const token = response.data.user;

      localStorage.setItem('userData', JSON.stringify(token));

      navigate('/userPage');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="user-container">
      <div className="login-form">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default User;
