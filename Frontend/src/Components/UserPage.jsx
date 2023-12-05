import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../Css/UserPage.css";

const UserPage = () => {
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/createAlbum/getAlbum"
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

  return (
    <Fragment>
      <div className="outer-page-user">
        <div className="user-page-container">
          {userAlbums.map((album) => (
            <div key={album._id} className="album-card">
              <h2 className="album-title">{album.title}</h2>
              <p className="album-description">{album.description}</p>

              {album.photos.map((photos) => (
                <img
                  key={photos._id}
                  className="album-photo"
                  src={`http://localhost:5500/${photos.path}`}
                  alt={photos._id}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;
