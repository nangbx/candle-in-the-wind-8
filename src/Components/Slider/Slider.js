import { useEffect } from "react";
import "./Slider.scss";

export default function Slider() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/app.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <div className="image-slider">
        <div className="image-item">
          <div className="image">
            <img src="./img/drew-coffman-jUOaONoXJQk-unsplash.jpg" alt="" />
          </div>
        </div>
        <div className="image-item">
          <div className="image">
            <img src="./img/artem-gavrysh-F6-U5fGAOik-unsplash.jpg" alt="" />
          </div>
          
        </div>
        <div className="image-item">
          <div className="image">
            <img src="./img/joanna-kosinska-B43a-FPxYqU-unsplash.jpg" alt="" />
          </div>
        </div>
        <div className="image-item">
          <div className="image">
            <img src="./img/mike-petrucci-c9FQyqIECds-unsplash.jpg" alt="" />
          </div>
        </div>
        <div className="image-item">
          <div className="image">
            <img src="./img/nathaniel-yeo-747NDboAWNY-unsplash.jpg" alt="" />
          </div>
        </div>
      </div>
      {/* <div className="slider-info">
        <div className="text">
          <h1>High-Quality</h1>
          <h1>Furniture Just</h1>
          <h1>For You</h1>
          <p>
            Our furniture is made from selected and best quality materials that
            are suitable for your dream home
          </p>
          <a href="true">Shop Now</a>
        </div>
      </div> */}
    </div>
  );
}
