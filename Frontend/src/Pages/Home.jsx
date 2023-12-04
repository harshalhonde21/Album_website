  import { Fragment } from "react";
  import "../Css/Home.css";

  const Home = () => {
    return (
      <Fragment>
        <div className="home-container">
          <div className="image-section">
            <div className="overlay-text">
              <h1>Creating Memories <br />Together</h1>
              <button>Click Me</button>
            </div>
            <img src="/photobooks.webp" alt="Background" />
          </div>
        </div>
      </Fragment>
    );
  };

  export default Home;
