import React, { useState } from "react";
import axios from "axios";
import ImageDisplay from "./components/ImageDisplay";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.log("Please select a file");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const data = reader.result.split(",")[1]; // Extract base64 data
        await axios.post("http://localhost:3001/upload", { data });
        console.log("Image uploaded successfully");
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <ImageDisplay />
    </div>
  );
}

export default App;
