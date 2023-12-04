import { Fragment, useState } from "react";
import "../Css/Admin.css";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5500/admin/login", {
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
        alert("login success");
      } else {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
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
              type="text" 
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
