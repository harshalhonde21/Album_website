import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/User.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userData is present in local storage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      navigate("/userPage");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://album-website.onrender.com/user/login", {
        username,
        password,
      });
      const token = response.data.user;
      toast.success('Successfully logged in!');
      localStorage.setItem("userData", JSON.stringify(token));
      navigate("/userPage");
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.response && error.response.status === 401) {
        toast.error('Invalid username or password. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="user-container">
      <div className="login-form">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          User Login
        </h1>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default User;
