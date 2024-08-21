// UserContext needs adding to this file!!

"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Drama",
  "Fantasy/Magic",
  "Historic",
  "Romance",
  "Horror",
];

const PostBook = () => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    imageUrl: "",
    owner: user?.username || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      genre: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API once it's set up and ready.
    console.log("Form Data:", formData);
    setFormData({
      title: "",
      author: "",
      genre: "",
      description: "",
      imageUrl: "",
      owner: "",
    });
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={formData.genre}
              onChange={handleGenreChange}
              label="Genre"
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: "#595959" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PostBook;
