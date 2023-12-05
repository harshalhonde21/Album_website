import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import "../Css/AllImages.css";

const AllImages = () => {
  const location = useLocation();
  const { album } = location.state;

  return (
    <Fragment>
      <div className="outer-all-images">
        <div className="all-images-container">
          <h1 className="album-heading">{album.title}</h1>
          <p className="album-description">{album.description}</p>

          <div className="image-gallery">
            {album.photos.map((photo) => (
              <img
                key={photo._id}
                className="album-photo"
                src={`http://localhost:5500/${photo.path}`}
                alt={photo._id}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllImages;
