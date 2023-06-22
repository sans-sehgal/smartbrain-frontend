import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({box, image_url}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id = "inputimage"
          alt=""
          src={
            image_url
          }
          style={{
            maxWidth: "500px", // Limit the image's maximum width to its container
            height: "auto", // Maintain the image's aspect ratio
          }}
        />
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
