import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/UserPage.css";

const UserPage = () => {
  const [userAlbums, setUserAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://album-website.onrender.com/createAlbum/getAlbum"
        );
        const albums = response.data;

        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          console.error("User data not found in local storage");
          return;
        }

        const userData = JSON.parse(userDataString);

        const userAlbums = albums.filter(
          (album) => album.user === userData._id
        );

        setUserAlbums(userAlbums);
      } catch (error) {
        console.error("Error fetching user albums:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAlbumClick = (album) => {
    navigate("/allImages", { state: { album } });
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/user");
  };

  return (
    <Fragment>
      <div className="outer-page-user">
        <div className="user-page-container">
          {userAlbums.map((album) => (
            <div
              key={album._id}
              className="album-card"
              onClick={() => handleAlbumClick(album)}
            >
              <h2 className="album-title">{album.title}</h2>
              <p className="album-description">{album.description}</p>

              <img className="album-photo" src="/bg1.jpg" alt="no image" />
            </div>
          ))}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default UserPage;
