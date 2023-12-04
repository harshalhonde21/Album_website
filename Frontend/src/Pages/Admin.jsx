import { Fragment } from "react";
import "../Css/Admin.css";

const Admin = () => {
  return (
    <Fragment>
      <div className="admin-container">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
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
