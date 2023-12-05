import { Fragment } from "react";
import "../Css/Home.css";

const Home = () => {
  return (
    <Fragment>
      <div className="home-container">
        <div className="text-section">
          <div className="overlay-text">
            <h1>Prism Photography</h1>
            <br />  
            <br />  
            <h3>Every moment, every emotion, perfectly framed.</h3>
            <button>Explore</button>
          </div>
        </div>
        <div className="image-section">
          <img src="/bg1.jpg" alt="Background" />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
