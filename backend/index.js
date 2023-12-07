const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (Make sure MongoDB is running)

const imageSchema = new mongoose.Schema({
  data: { type: String, required: true }, // base64 encoded image data
});

const Image = mongoose.model("Image", imageSchema);

app.use(bodyParser.json());

app.post("/upload", async (req, res) => {
  try {
    const { data } = req.body;
    await Image.create({ data });
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// New endpoint to get image data
app.get("/image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const imageData = await Image.findById(id);

    if (!imageData) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({ data: imageData.data });
  } catch (error) {
    console.error("Error fetching image data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://fadhil:fadhiltalitha@fadhilkholaf.nhkci0t.mongodb.net/testing",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB");
  });
