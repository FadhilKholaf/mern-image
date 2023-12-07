import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageDisplay() {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("http://localhost:3001/image/65712dbeeca25a17b0264308"); // Replace "your_image_id" with the actual image ID
        setImageData(response.data.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      <h1>Image Display</h1>
      {imageData && <img src={`data:image/png;base64,${imageData}`} alt="Uploaded" />}
    </div>
  );
}

export default ImageDisplay;
