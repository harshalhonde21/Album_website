import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Css/Admin.css";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData) {
      navigate("/createAlbum");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://album-website.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const adminData = await response.json();
        localStorage.setItem("adminData", JSON.stringify(adminData));
        toast.success("Successfully Login!");
        navigate("/createAlbum");
      } else {
        const errorMessage = await response.text();
        if (errorMessage.includes("Invalid credentials")) {
          toast.error("Incorrect password. Please try again.");
          setUsername("");
          setPassword("");
        } else {
          throw new Error(
            `HTTP error! Status: ${response.status}. Message: ${errorMessage}`
          );
        }
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Fragment>
      <div className="admin-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
              Admin Login
            </h1>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Admin;
